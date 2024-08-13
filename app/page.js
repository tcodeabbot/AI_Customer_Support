"use client";

import { useState } from "react";
import { Box, Stack } from "@chakra-ui/react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am your coder's assistant. How can I help you today?",
    },
  ]);

  return (
    <Box>
      <Stack direction="column" spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
        {messages.map((message, index) => (
          <Box key={index} display="flex" justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}>
            <Box
              bgColor={message.role === "assistant" ? "primary.main" : "secondary.main"}
              color="white"
              borderRadius="16"
              p={3}
            >
              {message.content}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
