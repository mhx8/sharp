import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";

// Shared types
export interface BudgetEntity {
  partitionKey: string;
  rowKey: string;
  name?: string;
  preferredBudget: number;
  timestamp?: string;
}

export interface IdeaEntity {
  partitionKey: string;
  rowKey: string;
  name: string;
  idea: string;
  timestamp?: string;
}

class AzureTableService {
  private budgetTableClient: TableClient;
  private ideaTableClient: TableClient;

  constructor() {
    if (
      !process.env.AZURE_STORAGE_ACCOUNT_NAME ||
      !process.env.AZURE_STORAGE_ACCOUNT_KEY
    ) {
      throw new Error("Azure Storage credentials not configured");
    }

    const credential = new AzureNamedKeyCredential(
      process.env.AZURE_STORAGE_ACCOUNT_NAME,
      process.env.AZURE_STORAGE_ACCOUNT_KEY,
    );

    this.budgetTableClient = new TableClient(
      `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.table.core.windows.net`,
      "Budgets",
      credential,
    );

    this.ideaTableClient = new TableClient(
      `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.table.core.windows.net`,
      "Ideas",
      credential,
    );
  }

  // Initialize tables (call this once to create tables if they don't exist)
  async initializeTables() {
    try {
      await this.budgetTableClient.createTable();
      console.log("Budget table created or already exists");
    } catch (error: unknown) {
      const azureError = error as { statusCode?: number };
      if (azureError.statusCode !== 409) {
        // 409 = table already exists
        console.error("Error creating budget table:", error);
        throw error;
      }
    }

    try {
      await this.ideaTableClient.createTable();
      console.log("Ideas table created or already exists");
    } catch (error: unknown) {
      const azureError = error as { statusCode?: number };
      if (azureError.statusCode !== 409) {
        // 409 = table already exists
        console.error("Error creating ideas table:", error);
        throw error;
      }
    }
  }

  // Budget operations
  async addBudget(
    budget: Omit<BudgetEntity, "partitionKey" | "rowKey">,
  ): Promise<BudgetEntity> {
    const entity: BudgetEntity = {
      partitionKey: "shanice-bachelor-party",
      rowKey: `budget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...budget,
      timestamp: new Date().toISOString(),
    };

    try {
      await this.budgetTableClient.createEntity(entity);
      return entity;
    } catch (error) {
      console.error("Error adding budget:", error);
      throw new Error("Failed to add budget");
    }
  }

  async getAllBudgets(): Promise<BudgetEntity[]> {
    try {
      const entities = this.budgetTableClient.listEntities<BudgetEntity>({
        queryOptions: { filter: `PartitionKey eq 'shanice-bachelor-party'` },
      });

      const budgets: BudgetEntity[] = [];
      for await (const entity of entities) {
        budgets.push(entity);
      }

      return budgets.sort(
        (a, b) =>
          new Date(b.timestamp || "").getTime() -
          new Date(a.timestamp || "").getTime(),
      );
    } catch (error) {
      console.error("Error fetching budgets:", error);
      throw new Error("Failed to fetch budgets");
    }
  }

  async deleteBudget(rowKey: string): Promise<void> {
    try {
      await this.budgetTableClient.deleteEntity(
        "shanice-bachelor-party",
        rowKey,
      );
    } catch (error) {
      console.error("Error deleting budget:", error);
      throw new Error("Failed to delete budget");
    }
  }

  async clearAllBudgets(): Promise<void> {
    try {
      const budgets = await this.getAllBudgets();
      const deletePromises = budgets.map((budget) =>
        this.budgetTableClient.deleteEntity(budget.partitionKey, budget.rowKey),
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error clearing budgets:", error);
      throw new Error("Failed to clear budgets");
    }
  }

  // Idea operations
  async addIdea(
    idea: Omit<IdeaEntity, "partitionKey" | "rowKey">,
  ): Promise<IdeaEntity> {
    const entity: IdeaEntity = {
      partitionKey: "shanice-bachelor-party",
      rowKey: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...idea,
      timestamp: new Date().toISOString(),
    };

    try {
      await this.ideaTableClient.createEntity(entity);
      return entity;
    } catch (error) {
      console.error("Error adding idea:", error);
      throw new Error("Failed to add idea");
    }
  }

  async getAllIdeas(): Promise<IdeaEntity[]> {
    try {
      const entities = this.ideaTableClient.listEntities<IdeaEntity>({
        queryOptions: { filter: `PartitionKey eq 'shanice-bachelor-party'` },
      });

      const ideas: IdeaEntity[] = [];
      for await (const entity of entities) {
        ideas.push(entity);
      }

      return ideas.sort(
        (a, b) =>
          new Date(b.timestamp || "").getTime() -
          new Date(a.timestamp || "").getTime(),
      );
    } catch (error) {
      console.error("Error fetching ideas:", error);
      throw new Error("Failed to fetch ideas");
    }
  }

  async deleteIdea(rowKey: string): Promise<void> {
    try {
      await this.ideaTableClient.deleteEntity("shanice-bachelor-party", rowKey);
    } catch (error) {
      console.error("Error deleting idea:", error);
      throw new Error("Failed to delete idea");
    }
  }

  async clearAllIdeas(): Promise<void> {
    try {
      const ideas = await this.getAllIdeas();
      const deletePromises = ideas.map((idea) =>
        this.ideaTableClient.deleteEntity(idea.partitionKey, idea.rowKey),
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error clearing ideas:", error);
      throw new Error("Failed to clear ideas");
    }
  }
}

// Singleton instance
let azureTableService: AzureTableService | null = null;

export function getAzureTableService(): AzureTableService {
  if (!azureTableService) {
    azureTableService = new AzureTableService();
    // Initialize tables on first use
    azureTableService.initializeTables().catch(console.error);
  }
  return azureTableService;
}
