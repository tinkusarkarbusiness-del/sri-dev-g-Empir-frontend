import AuthenticatedLayout from "../(authenticated)/layout";

export default function MirrorLayout({ children }: { children: React.ReactNode }) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}
