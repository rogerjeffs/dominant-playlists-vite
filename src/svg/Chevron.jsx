function Chevron({ color, isOpen }) {
  if (!color) color = "black";
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={!isOpen ? "chevron" : "chevron chevron-open"}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke={color}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M0 0h24v24H0z' stroke='none'></path>
      <path d='m6 9 6 6 6-6'></path>
    </svg>
  );
}

export default Chevron;
