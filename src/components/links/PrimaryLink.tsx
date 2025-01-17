import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';
import * as React from 'react';

const PrimaryLinkVariant = ['primary', 'secondary', 'basic'] as const;
type PrimaryLinkProps = {
  variant?: (typeof PrimaryLinkVariant)[number];
} & UnstyledLinkProps;

const PrimaryLink = React.forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  ({ className, children, variant = 'primary', ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center',
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'font-bold',
          //#region  //*=========== Variant ===========
          variant === 'primary' && [
            'text-primary-500 hover:text-primary-600 active:text-primary-700',
            'disabled:text-primary-200',
          ],
          variant === 'secondary' && [
            'text-secondary hover:text-secondary-600 active:text-secondary-800',
            'disabled:text-secondary-200',
          ],
          variant === 'basic' && [
            'text-black hover:text-gray-600 active:text-gray-800',
            'disabled:text-gray-300',
          ],
          //#endregion  //*======== Variant ===========
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default PrimaryLink;
