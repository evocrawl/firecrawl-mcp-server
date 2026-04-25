import { jest } from '@jest/globals';
import EvocrawlApp from '@mendable/evocrawl-js';
import type {
  SearchResponse,
  BatchScrapeResponse,
  BatchScrapeStatusResponse,
  EvocrawlDocument,
} from '@mendable/evocrawl-js';

// Set test timeout
jest.setTimeout(30000);

// Create mock responses
const mockSearchResponse: SearchResponse = {
  success: true,
  data: [
    {
      url: 'https://example.com',
      title: 'Test Page',
      description: 'Test Description',
      markdown: '# Test Content',
      actions: null as never,
    },
  ] as EvocrawlDocument<undefined, never>[],
};

const mockBatchScrapeResponse: BatchScrapeResponse = {
  success: true,
  id: 'test-batch-id',
};

const mockBatchStatusResponse: BatchScrapeStatusResponse = {
  success: true,
  status: 'completed',
  completed: 1,
  total: 1,
  creditsUsed: 1,
  expiresAt: new Date(),
  data: [
    {
      url: 'https://example.com',
      title: 'Test Page',
      description: 'Test Description',
      markdown: '# Test Content',
      actions: null as never,
    },
  ] as EvocrawlDocument<undefined, never>[],
};

// Create mock instance methods
const mockSearch = jest.fn().mockImplementation(async () => mockSearchResponse);
const mockAsyncBatchScrapeUrls = jest
  .fn()
  .mockImplementation(async () => mockBatchScrapeResponse);
const mockCheckBatchScrapeStatus = jest
  .fn()
  .mockImplementation(async () => mockBatchStatusResponse);

// Create mock instance
const mockInstance = {
  apiKey: 'test-api-key',
  apiUrl: 'test-api-url',
  search: mockSearch,
  asyncBatchScrapeUrls: mockAsyncBatchScrapeUrls,
  checkBatchScrapeStatus: mockCheckBatchScrapeStatus,
};

// Mock the module
jest.mock('@mendable/evocrawl-js', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => mockInstance),
}));
