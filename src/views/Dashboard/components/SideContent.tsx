import { Box, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

const SideContent = () => {
  return (
    <Box
      w='336px'
      bgColor='#061223'
      zIndex='2'
      borderRadius='1em'
      my="2em"
    >
      <VStack>
        <Box>
          <Heading>
            Ryan M.
          </Heading>
        </Box>
      </VStack>
    </Box>
  )
}

export default SideContent;