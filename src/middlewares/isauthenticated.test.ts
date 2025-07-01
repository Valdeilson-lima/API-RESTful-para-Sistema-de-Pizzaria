import { Request, Response, NextFunction } from 'express';
import { isAuthenticated } from './isauthenticated';
import { verify } from 'jsonwebtoken';

// Mock do jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('isAuthenticated Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  const mockVerify = verify as jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('should call next() if a valid token is provided', async () => {
    const token = 'valid-token';
    const decoded = { id: 'user-id' };

    mockRequest.headers = { authorization: `Bearer ${token}` };
    mockVerify.mockReturnValue(decoded);

    isAuthenticated(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockVerify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(mockRequest.user_id).toBe(decoded.id);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', () => {
    mockRequest.headers = {};

    isAuthenticated(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockVerify).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token inválido!' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    const token = 'invalid-token';

    mockRequest.headers = { authorization: `Bearer ${token}` };
    mockVerify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    isAuthenticated(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockVerify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token inválido!' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if token format is incorrect (no Bearer)', () => {
    mockRequest.headers = { authorization: 'just-a-token' };

    isAuthenticated(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockVerify).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token inválido!' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
