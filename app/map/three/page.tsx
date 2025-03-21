// /app/map/three/page.tsx
"use client";

import { Suspense } from "react";
import Three from "./Three";

export default function ThreePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Three />
        </Suspense>
    );
}
