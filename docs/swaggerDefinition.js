const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Registro de Protestos e Emolumentos',
    version: '1.0.0',
    description: 'API para registrar protestos e emolumentos'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  components: {
    securitySchemes: {
      Authorization: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        value: "Bearer <JWT token here>"
      }
    },
    schemas: {
      UserResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'O ID do usuário'
          },
          name: {
            type: 'string',
            description: 'O nome do usuário'
          },
          email: {
            type: 'string',
            description: 'O e-mail do usuário'
          },
          role: {
            type: 'string',
            description: 'O papel do usuário',
            enum: ['USER', 'EMPLOYEE', 'ADMIN']
          },
          hasSetInitialPassword: {
            type: 'boolean',
            description: 'Indica se o usuário configurou a senha inicial'
          }
        },
        example: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'USER',
          hasSetInitialPassword: false
        }
      },
      UserCreationRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            description: 'O nome do usuário'
          },
          email: {
            type: 'string',
            description: 'O email do usuário'
          },
          password: {
            type: 'string',
            description: 'A senha do usuário'
          },
          role: {
            type: 'string',
            description: 'O papel do usuário',
            enum: ['USER', 'EMPLOYEE', 'ADMIN']
          }
        },
        example: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: 'USER'
        }
      },
      Protest: {
        type: 'object',
        required: ['payeeDocumentNumber', 'payeeName', 'debtAmount', 'debtorDocumentNumber'],
        properties: {
          id: {
            type: 'integer',
            description: 'O ID do protesto'
          },
          payeeDocumentNumber: {
            type: 'string',
            description: 'Número do documento do cobrador'
          },
          payeeName: {
            type: 'string',
            description: 'Nome do cobrador'
          },
          payeeEmail: {
            type: 'string',
            description: 'Email do cobrador'
          },
          debtAmount: {
            type: 'number',
            description: 'Valor da dívida'
          },
          description: {
            type: 'string',
            description: 'Descrição da dívida'
          },
          debtorDocumentNumber: {
            type: 'string',
            description: 'Número do documento do devedor'
          },
          userId: {
            type: 'integer',
            description: 'ID do usuário associado ao protesto (cobrador)'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação do protesto'
          }
        },
        example: {
          id: 1,
          payeeDocumentNumber: '1234567890',
          payeeName: 'John Doe',
          payeeEmail: 'john@example.com',
          debtAmount: 1500.00,
          description: 'Debt for service not paid',
          debtorDocumentNumber: '0987654321',
          userId: 2,
          createdAt: '2024-05-16T09:30:00.000Z'
        }
      },
      ProtestCreationRequest: {
        type: 'object',
        required: ['payeeDocumentNumber', 'payeeName', 'debtAmount', 'debtorDocumentNumber'],
        properties: {
          payeeDocumentNumber: {
            type: 'string',
            description: 'Número do documento do cobrador'
          },
          payeeName: {
            type: 'string',
            description: 'Nome do cobrador'
          },
          payeeEmail: {
            type: 'string',
            description: 'Email do cobrador'
          },
          debtAmount: {
            type: 'number',
            description: 'Valor da dívida'
          },
          description: {
            type: 'string',
            description: 'Descrição da dívida'
          },
          debtorDocumentNumber: {
            type: 'string',
            description: 'Número do documento do devedor'
          }
        },
        example: {
          payeeDocumentNumber: '1234567890',
          payeeName: 'John Doe',
          payeeEmail: 'john@example.com',
          debtAmount: 1500.00,
          description: 'Debt for service not paid',
          debtorDocumentNumber: '0987654321'
        }
      },
      Emolument: {
        type: 'object',
        required: ['protestId', 'amount'],
        properties: {
          id: {
            type: 'integer',
            description: 'O ID do emolumento'
          },
          protestId: {
            type: 'integer',
            description: 'O ID do protesto associado'
          },
          amount: {
            type: 'number',
            description: 'Valor do emolumento'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação do emolumento'
          }
        },
        example: {
          id: 1,
          protestId: 1,
          amount: 112.50,
          createdAt: '2024-05-16T09:30:00.000Z'
        }
      },
      EmolumentCreationRequest: {
        type: 'object',
        required: ['protestId', 'amount'],
        properties: {
          protestId: {
            type: 'integer',
            description: 'O ID do protesto associado'
          },
          amount: {
            type: 'number',
            description: 'Valor do emolumento'
          }
        },
        example: {
          protestId: 1,
          amount: 112.50
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            description: 'O email do usuário'
          },
          password: {
            type: 'string',
            description: 'A senha do usuário'
          }
        },
        example: {
          email: 'john@example.com',
          password: 'password123'
        }
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'O token JWT gerado'
          }
        },
        example: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  }
};

module.exports = swaggerDefinition;
