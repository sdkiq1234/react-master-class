import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: block;
`;

const DataBox = styled.div`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadein 3s;
  display: flex;
  margin: 0 auto;
  width: 90%;
  height: 50px;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-radius: 15px;
  margin-bottom: 10px;
`;

const DataName = styled.span`
  color: black;
`;

const Data = styled.span`
  color: green;
  font-size: 20px;
`;

interface PriceProps {
  tickersData: any;
}

function Price({ tickersData }: PriceProps) {
  console.log(tickersData);
  return (
    <Container>
      <DataBox>
        <DataName>Price</DataName>
        <Data>{tickersData.quotes.USD.price.toFixed(2)}</Data>
      </DataBox>
      <DataBox>
        <DataName>Market Capacity</DataName>
        <Data>{tickersData.quotes.USD.market_cap}</Data>
      </DataBox>
      <DataBox>
        <DataName>Change in 1h</DataName>
        <Data>{tickersData.quotes.USD.percent_change_1h}</Data>
      </DataBox>
      <DataBox>
        <DataName>Change in 1d</DataName>
        <Data>{tickersData.quotes.USD.percent_change_24h}</Data>
      </DataBox>
    </Container>
  );
}

export default Price;
