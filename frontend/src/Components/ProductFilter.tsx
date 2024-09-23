import styled from "styled-components";

interface Props {
  className?: string;
}

const ProductFilter = ({ className }: Props) => {
  return (
    <div className={className}></div>
  );
};

const StyledProductFilter = styled(ProductFilter)`
`;

export default StyledProductFilter;