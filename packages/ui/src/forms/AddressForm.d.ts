import React from 'react';
import { CreateProjectInput } from '@solarops/shared';
interface AddressFormProps {
    onSubmit: (data: CreateProjectInput) => void;
    defaultValues?: Partial<CreateProjectInput>;
    loading?: boolean;
}
export declare function AddressForm({ onSubmit, defaultValues, loading }: AddressFormProps): React.JSX.Element;
export {};
//# sourceMappingURL=AddressForm.d.ts.map