
import { Contacts } from "../routes/Contacts";
import { Contact } from "../routes/Contact";
import { Add } from "../routes/Add";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Contacts />
    },
    {
        path:"/contacts/:id",
        element: <Contact />
    },
    {
        path:"/add",
        element: <Add />
    }
]);

export default router;