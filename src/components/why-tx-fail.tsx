import useSWR from 'swr';

import {
  Box,
  Button,
  Card,
  CardBody,
  Code,
  Divider,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  VStack,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import type { MempoolTransaction, Transaction } from '@stacks/stacks-blockchain-api-types';
import ReactMarkdown from 'react-markdown';

import { Badge } from '@/common/components/Badge';

const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const WhyTxFail = ({ tx }: { tx: Transaction | MempoolTransaction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, error } = useSWR(`https://hackathon-txfail.vercel.app/api/tx/${tx.tx_id}`, fetcher);

  if (error) return null;
  if (!data) return null;

  return (
    <Badge
      labelProps={{ display: 'flex', alignItems: 'center', gap: '4px' }}
      background={`bg.${useColorMode().colorMode}`}
      gap={'4px'}
      color="white"
      bg="rgba(255,255,255,0.24)"
      border={'none'}
      onClick={onOpen}
      style={{ cursor: 'pointer' }}
    >
      <strong>🔍 Investigate 🧙🏻</strong>
      {/* <Icon as={IconComponent} size="16px" color="currentColor" /> */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Why did this transaction fail?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="24px">
              {data.tx.tx_status === 'success' && (
                <Box w="full">
                  Hmm.. Looks like this transaction was a <i>success</i>!
                </Box>
              )}
              {data.tx.tx_status !== 'success' && data.reasons.length === 0 && (
                <Box w="full">
                  Unable to determine why this transaction failed. Please try again later.
                </Box>
              )}
              {data.reasons.length > 0 &&
                data.reasons.map((reason: any, i: number) => (
                  <Card key={i} w="full" variant="outline">
                    <CardBody>
                      <VStack spacing="6px" w="full" align="stretch">
                        <Box lineHeight={1.35}>
                          <ReactMarkdown
                            components={{
                              code: ({ node, ...props }) => (
                                <Code
                                  wordBreak="break-all"
                                  borderRadius={3}
                                  px={1}
                                  py={0.5}
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {reason.description}
                          </ReactMarkdown>
                          {reason.readMore && (
                            <Button
                              mt={1}
                              as="a"
                              href={reason.readMore}
                              target="_blank"
                              rel="noopener noreferrer"
                              // variant="link"
                              colorScheme="purple"
                              float="right"
                              size="sm"
                            >
                              Read more &rarr;
                            </Button>
                          )}
                        </Box>

                        {reason.references?.length > 0 && (
                          <Box>
                            <Text color="gray.400" fontWeight="semibold" fontSize="sm">
                              References
                            </Text>
                            <UnorderedList
                              spacing="12px"
                              w="full"
                              pl={3}
                              fontSize="sm"
                              color="gray.400"
                              mt="1"
                            >
                              {reason.references.map((ref: any, i: number) => (
                                <ListItem key={i}>
                                  <Button
                                    key={i}
                                    as="a"
                                    href={ref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="link"
                                    colorScheme="purple"
                                    fontSize="sm"
                                  >
                                    {ref}
                                  </Button>
                                </ListItem>
                              ))}
                            </UnorderedList>
                          </Box>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              {data.rawLogs.length > 0 && (
                <VStack spacing="12px" align="stretch">
                  <Divider />
                  <Text>
                    <strong>Raw logs referencing this transaction:</strong>
                  </Text>
                  {data.rawLogs.map((log: string, i: number) => (
                    <Code key={i} wordBreak="break-all" borderRadius={6} p={2}>
                      {log}
                    </Code>
                  ))}
                </VStack>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Badge>
  );
};

export default WhyTxFail;
