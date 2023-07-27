import React from "react";
import { Settings, User } from "react-feather";
import { Card } from "./Card";
import Badge from "./Badge";

const UserDataItemCard = (props: any) => {
  const { userId, company, numUsers, numProducts, percentage } = props;
  return (
    <div>
      <Card className="flex items-center rounded-xl justify-between h-[70px] px-3 text-sm">
        <Badge className="text-xs" prefix={<User size={18} />} variant={""}>
          User
        </Badge>
        <span className="mx-4 flex-[2]">{company}</span>
        <span className="mx-4 flex-[2]">{numUsers}</span>
        <span className="mx-4 flex-[2]">{numProducts}</span>
        <span className="mx-4 flex-[2]">{percentage}</span>
      </Card>
    </div>
  );
};

export default UserDataItemCard;
