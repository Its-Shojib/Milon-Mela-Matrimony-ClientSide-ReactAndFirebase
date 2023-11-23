import { Button } from "@material-tailwind/react";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <div><Button>Button</Button></div>,
    },
]);
export default router;