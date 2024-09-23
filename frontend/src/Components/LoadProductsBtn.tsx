import styled from "styled-components";

interface Props {
  className?: string;
  funct: () => void;
}

const LoadProductsBtn = ({ className, funct }: Props) => {
  return (
    <button className={className}
    onClick={funct}>
      <p>Show more products</p>
    </button>
  );
};

const StyledLoadProductsBtn = styled(LoadProductsBtn)`
  margin: 30px auto;
  display: block;
  max-width: max-content;
  border-radius: 20px;
  font-size: 20px;
  p {
    padding: 10px;
  }
`;

export default StyledLoadProductsBtn;