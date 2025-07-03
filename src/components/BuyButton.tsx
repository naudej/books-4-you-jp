import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatCurrency } from '../utils/utils.ts';
import { RetailPrice } from '../data/types.ts';

interface BuyButtonProps {
  link: string;
  price: RetailPrice;
  ariaLabel?: string;
}
const BuyButton = ({ link, price, ariaLabel = 'Add to shopping cart' }: BuyButtonProps) => {
  const { amount, currencyCode } = price;
  return (
    <Button
      component="a"
      href={link}
      target="_blank"
      color="primary"
      aria-label={ariaLabel}
      variant="text"
      startIcon={<AddShoppingCartIcon />}
    >
      <Typography variant="h6" color="textSecondary">
        {formatCurrency(amount, currencyCode)}
      </Typography>
    </Button>
  );
};
export default BuyButton;
