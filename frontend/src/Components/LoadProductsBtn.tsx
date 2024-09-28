import styled from "styled-components";

interface Props {
  className?: string;
  onClick: () => void;
}

const LoadProductsBtn = ({ className, onClick}: Props) => {
  return (
    <button className={className}
    onClick={onClick}>
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