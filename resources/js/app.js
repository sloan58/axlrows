import './bootstrap';
import { basicEditor } from "prism-code-editor/setups"
import "prism-code-editor/prism/languages/sql"

import collapse from "@alpinejs/collapse";
import anchor from "@alpinejs/anchor";

document.addEventListener(
    "alpine:init",
    () => {
        const modules = import.meta.glob("./plugins/**/*.js", { eager: true });

        for (const path in modules) {
            window.Alpine.plugin(modules[path].default);
        }
        window.Alpine.plugin(collapse);
        window.Alpine.plugin(anchor);
    },
    { once: true },
);

// noinspection JSConstantReassignment
window.basicEditor = basicEditor;


