'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/supabase'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export type StatusItem = {
    id: number
    name: string
    status: string
    ticket: string
    numbered: boolean
}

export default function StatusManager() {
    const [statuses, setStatuses] = useState<StatusItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    // 編集対象のレコードを保持（モーダル表示用）
    const [editingStatus, setEditingStatus] = useState<StatusItem | null>(null)
    // 編集用に「numbered」状態を管理するローカルステート
    const [editedNumbered, setEditedNumbered] = useState<boolean>(false)

    // ステータスデータの取得（チケット情報・numbered も含む）
    useEffect(() => {
        async function fetchStatuses() {
            const { data, error } = await supabase
                .from('status')
                .select('id, name, status, ticket, numbered')
                .order('id', { ascending: true })
            if (error) {
                console.error('Failed to fetch statuses:', error)
            } else if (data) {
                setStatuses(data as StatusItem[])
            }
            setIsLoading(false)
        }
        fetchStatuses()
    }, [])

    // 編集対象が変わったら、editedNumbered を初期化
    useEffect(() => {
        if (editingStatus) {
            setEditedNumbered(editingStatus.numbered)
        }
    }, [editingStatus])

    // 編集モーダルのフォーム送信処理（ステータス・チケット・numbered を更新）
    async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!editingStatus) return

        setIsSaving(true)
        const formData = new FormData(e.currentTarget)
        const newStatus = String(formData.get('status') || '')
        const newTicket = String(formData.get('ticket') || '')
        const { error } = await supabase
            .from('status')
            .update({ status: newStatus, ticket: newTicket, numbered: editedNumbered })
            .eq('id', editingStatus.id)
        if (error) {
            console.error('Failed to update status:', error)
        } else {
            setStatuses(prev =>
                prev.map(item =>
                    item.id === editingStatus.id
                        ? { ...item, status: newStatus, ticket: newTicket, numbered: editedNumbered }
                        : item
                )
            )
            setEditingStatus(null)
        }
        setIsSaving(false)
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">ステータスメッセージ / チケット管理</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : statuses.length === 0 ? (
                <p className="text-gray-600">表示するデータはありません。</p>
            ) : (
                <div className="space-y-4">
                    {statuses.map(item => (
                        <div key={item.id} className="bg-white rounded shadow p-4 relative">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">{item.name}</span>
                                    <p>
                                        <span className="">メッセージ:</span> {item.status || ''}
                                    </p>
                                    <p>
                                        <span className="">整理券情報:</span> {item.ticket || ''}
                                    </p>
                                    <p>
                                        <span className="">整理券の有無:</span> {item.numbered ? 'あり' : 'なし'}
                                    </p>
                                </div>
                                <div>
                                    <Button
                                        variant="default"
                                        size="icon"
                                        onClick={() => setEditingStatus(item)}
                                        title="編集"
                                    >
                                        <Edit size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 編集モーダル */}
            {editingStatus && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-lg w-full max-w-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">編集: {editingStatus.name}</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <Label>メッセージ</Label>
                                <textarea
                                    name="status"
                                    defaultValue={editingStatus.status}
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div className="mb-4">
                                <Label>整理券情報</Label>
                                <textarea
                                    name="ticket"
                                    defaultValue={editingStatus.ticket}
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <Label>整理券の有無</Label>
                                <Switch
                                    checked={editedNumbered}
                                    onCheckedChange={setEditedNumbered}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <Button type="submit" variant="default" disabled={isSaving}>
                                    {isSaving ? '保存中…' : '保存'}
                                </Button>
                                <Button variant="outline" onClick={() => setEditingStatus(null)}>
                                    キャンセル
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
