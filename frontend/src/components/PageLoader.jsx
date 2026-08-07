import { Loader2 } from 'lucide-react'

function PageLoader() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="size-12 animate-spin" />
        </div>
    )
}

export default PageLoader