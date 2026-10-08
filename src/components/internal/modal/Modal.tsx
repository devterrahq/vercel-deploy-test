// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { TimesSvg } from '@/components/svg';
import cn from 'classnames';
import './Modal.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

type TriggerElement = React.ReactElement<ButtonProps, 'button'>;

interface ModalProps {
  openTrigger?: TriggerElement;
  closeTrigger?: TriggerElement;
  children?: JSX.Element;
  accessibleTitle?: string;
  accessibleDescription?: string;
  whiteBackground?: boolean;
}
export default function Modal({
  accessibleTitle,
  accessibleDescription,
  closeTrigger,
  openTrigger,
  children,
  whiteBackground,
}: ModalProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const contentClasses = cn('dialog-content', whiteBackground ? 'white' : '');
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const closeDialogTrigger = React.isValidElement(closeTrigger) ? (
    React.cloneElement<ButtonProps>(closeTrigger, {
      'type': 'button',
      'aria-label': closeTrigger.props['aria-label'] || `Close ${accessibleTitle} Modal`,
      'className': `${closeTrigger.props.className} dialog-close-trigger`,
      'onClick': handleCloseDialog,
    })
  ) : (
    <div className='default-close'>
      <button
        type='button'
        aria-label={`Close ${accessibleTitle} Modal`}
        className='dialog-close'
        onClick={handleCloseDialog}
      >
        <TimesSvg />
      </button>
    </div>
  );
  const openDialogTrigger = React.isValidElement(openTrigger)
    ? React.cloneElement<ButtonProps>(openTrigger, {
        'type': 'button',
        'aria-label': openTrigger.props['aria-label'] || `Open ${accessibleTitle} Modal`,
        'className': `${openTrigger.props.className} dialog-open-trigger`,
        'onClick': handleOpenDialog,
      })
    : null;

  return (
    <Dialog.Root open={isDialogOpen}>
      {openDialogTrigger && <Dialog.Trigger asChild>{openDialogTrigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={`dialog-overlay ${whiteBackground ? 'white' : ''}`} />
        <Dialog.Content className={`dialog-content-wrapper ${whiteBackground ? 'white' : ''}`}>
          {closeDialogTrigger ? <Dialog.Close asChild>{closeDialogTrigger}</Dialog.Close> : null}
          <div className={contentClasses}>
            {accessibleTitle && (
              <Dialog.Title className='dialog-title' aria-hidden='false'>
                {accessibleTitle}
              </Dialog.Title>
            )}
            {accessibleDescription && (
              <Dialog.Description className='dialog-description' aria-hidden='false'>
                {accessibleDescription}
              </Dialog.Description>
            )}
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
