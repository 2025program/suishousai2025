// /app/map/two/page.tsx
"use client";

import { Suspense } from "react";
import Two from "./Two";

export default function ThreePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Two />
        </Suspense>
    );
}
