import { Button, Card, Flex } from "antd";
import React from "react";
import PaymentInfo from "./PaymentInfo";
import { CalculatorTwoTone } from "@ant-design/icons";

function Calculate({ members, groups }) {
  const [results, setResults] = React.useState([]);
  const calculate = (members, groups) => {
    const results = members.map((member) => {
      return {
        memberId: member.id,
        memberName: member.name,
        payAmount: 0,
      };
    });
    groups.forEach((group) => {
      const sumExpenEachMember = group.members.map((member) => {
        const sumExpen = member.expenditures.reduce(
          (prev, curr) => prev + curr.price,
          0
        );
        return {
          memberId: member.id,
          sumExpen,
        };
      });
      console.log("sumExpenEachMemeber ", sumExpenEachMember);
      const sumExpen = sumExpenEachMember.reduce(
        (prev, curr) => prev + curr.sumExpen,
        0
      );
      const expenPerMember = sumExpen / group.members.length;
      console.log("expenPerMember", expenPerMember);
      const payAmounts = sumExpenEachMember.map((item) => {
        return {
          memberId: item.memberId,
          payAmount: expenPerMember - item.sumExpen,
        };
      });
      console.log("payAmounts", payAmounts);
      payAmounts.forEach((item) => {
        const result = results.find((ele) => ele.memberId === item.memberId);
        if (result) result.payAmount = result.payAmount + item.payAmount;
      });
    });
    console.log("results", results);
    return results
      .map((item) => {
        return { ...item, payAmount: Math.ceil(item.payAmount) };
      })
      .slice(1);
  };
  return (
    <>
      <Flex justify="center" style={{padding: "16px 0px"}}>
        <Button
          type="primary"
          icon={<CalculatorTwoTone />}
          size="large"
          onClick={() => setResults(calculate(members, groups))}
        >
          Calculate
        </Button>
      </Flex>
      <Flex wrap gap="large">
        {results.map((item, index) => {
          if (item.payAmount < 0) {
            return (
              <Card key={index} title={item.memberName}>
                Vinh sẽ gửi lại bạn {-item.payAmount}
              </Card>
            );
          }
          if (item.payAmount === 0) {
            return (
              <Card key={index} title={item.memberName}>
                Không cần gửi gì thêm
              </Card>
            );
          }
          return (
            <Card
              key={index}
              title={item.memberName}
              styles={{ body: { padding: 0 } }}
            >
              <PaymentInfo paymentInfo={item} />
            </Card>
          );
        })}
      </Flex>
    </>
  );
}

export default Calculate;
