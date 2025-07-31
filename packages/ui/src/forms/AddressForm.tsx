import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProjectSchema, CreateProjectInput, US_STATES } from '@solarops/shared';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Button } from '../components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/Select';

interface AddressFormProps {
  onSubmit: (data: CreateProjectInput) => void;
  defaultValues?: Partial<CreateProjectInput>;
  loading?: boolean;
}

export function AddressForm({ onSubmit, defaultValues, loading = false }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form">
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Smith Residence Solar Installation"
          className="mt-2"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="123 Main Street"
          className="mt-2"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        {errors.address && (
          <p id="address-error" className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register('city')}
            placeholder="San Francisco"
            className="mt-2"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          {errors.city && (
            <p id="city-error" className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <Label htmlFor="state">State</Label>
          <Select
            defaultValue={defaultValues?.state}
            onValueChange={(value) => setValue('state', value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(US_STATES).map(([code, name]) => (
                <SelectItem key={code} value={code} textValue={name as string}>
                  {name as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            {...register('zipCode')}
            placeholder="94105"
            className="mt-2"
            aria-invalid={!!errors.zipCode}
            aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
          />
          {errors.zipCode && (
            <p id="zipCode-error" className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        Start Solar Analysis
      </Button>
    </form>
  );
}