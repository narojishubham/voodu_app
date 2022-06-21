import { defineConfig } from "vite";
import react from "vite-preset-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    // refer this link for antd overide keys
                    // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
                    "primary-color": "#F2994A",
                },
                javascriptEnabled: true,
            },
        },
    },
});
