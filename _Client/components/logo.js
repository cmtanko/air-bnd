import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (
<svg width="42" height="42" version="1.1" viewBox="0 0 1200 1400" xmlns="http://www.w3.org/2000/svg">
 <g fill="#12b980">
  <path d="m100 900h1e3v-110.56c0-70.16-48.633-130.95-117.08-146.34-127.8-28.746-255.39-43.094-382.92-43.094s-255.12 14.348-382.92 43.094c-68.449 15.395-117.08 76.184-117.08 146.34zm95.141-354.47c134.95-30.355 269.91-45.531 404.86-45.531s269.91 15.176 404.86 45.531c114.09 25.66 195.14 126.97 195.14 243.91v210.56h-1200v-210.56c0-116.93 81.055-218.25 195.14-243.91z"/>
  <path d="m550 500v-50c0-27.613-22.387-50-50-50h-100c-27.613 0-50 22.387-50 50v50zm-150-200h100c82.844 0 150 67.156 150 150v150h-400v-150c0-82.844 67.156-150 150-150z"/>
  <path d="m850 500v-50c0-27.613-22.387-50-50-50h-100c-27.613 0-50 22.387-50 50v50zm-150-200h100c82.844 0 150 67.156 150 150v150h-400v-150c0-82.844 67.156-150 150-150z"/>
  <path d="m100 1e3h100v100h-100z"/>
  <path d="m1e3 1e3h100v100h-100z"/>
  <path d="m200 585.83v-335.83c0-27.613 22.387-50 50-50h700c27.613 0 50 22.387 50 50v253.25h100v-253.25c0-82.844-67.156-150-150-150h-700c-82.844 0-150 67.156-150 150v335.83z"/>
 </g>
</svg>
  );
})``;

Logo.defaultProps = {
  variant: 'primary'
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
