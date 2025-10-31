import AuthenticatedLayout from "../(authenticated)/layout";

export default function WalletLayout({ children }: { children: React.ReactNode }) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}
