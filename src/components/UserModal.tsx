import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Button } from 'rsuite';
import { User } from 'types/User';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onSave, user }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<User>({
    defaultValues: { id: 0, name: '', email: '', phone: '', company: { name: '' } },
  });

  React.useEffect(() => {
    if (user) {
      setValue('id', user.id);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('company.name', user.company?.name || '');
    } else {
      reset({ id: 0, name: '', email: '', phone: '', company: { name: '' } });
    }
  }, [user, setValue, reset]);

  const onSubmit: SubmitHandler<User> = (formData) => {
    onSave(formData);
    reset({ id: 0, name: '', email: '', phone: '', company: { name: '' } });
    onClose();
  };

  return (
    <Modal size="xs" open={open} onClose={onClose} className="mt-28 mb-10 min-h-[450px]">
      <Modal.Header>
        <Modal.Title>{user ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: 'none', maxHeight: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className={`w-full p-2 text-lg rounded-md border ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Email</label>
            <input
              {...register('email', { required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Invalid email format' } })}
              className={`w-full p-2 rounded-md border text-lg ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Phone</label>
            <input
              {...register('phone', { required: 'Phone number is required' })}
              className={`w-full p-2 rounded-md text-lg border ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Company</label>
            <input
              {...register('company.name', { required: 'Company name is required' })}
              className={`w-full p-2 rounded-md border text-lg ${errors.company?.name ? 'border-red-500' : ''}`}
            />
            {errors.company?.name && <p className="text-red-500 text-xs mt-1">{errors.company?.name.message}</p>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(onSubmit)} className='px-6 text-lg bg-[#28a745] hover:bg-[#1caf68]' appearance="primary">
          Save
        </Button>
        <Button onClick={onClose} appearance="subtle" className='px-6 text-lg'>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
