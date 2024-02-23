export const Iq7ErrorView = ({
    error,
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: () => void;
}) => (
    <div title={error.stack} className='bg-error text-error-content p-4'>
        <h1 className='text-lg font-medium'>Uh oh! Something went wrong. </h1>
        <pre>{error.message}</pre>
    </div>
);
