
  import { Avatar, Flex, Popover, Typography } from "antd";
  import React from "react";
//   import { useNavigate } from "react-router-dom";
  
  const HeaderContent = ({ title }) => {
    // const navigate = useNavigate();
  
    return (
      <Flex align="center" justify="space-between">
        <div style={{ marginTop: "-20px", marginLeft:"20px" }}>
          <Typography.Title level={4} >
            {title}
          </Typography.Title>
        </div>
        <Flex align="center" gap="3rem">
          <Flex align="center" gap="10px">
            
          </Flex>
        </Flex>
      </Flex>
    );
  };
  
  export default HeaderContent;
  