// src/lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr";
// 生成された型定義（例: src/types/database.ts）から Database 型をインポート
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Database 型をジェネリクスとして渡すことで、型安全にクエリを扱えます
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
