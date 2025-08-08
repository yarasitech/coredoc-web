export const sampleDocument = `Introduction to Machine Learning

Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. Instead of following pre-written instructions, machine learning algorithms build mathematical models based on training data to make predictions or decisions.

The fundamental idea behind machine learning is that systems can identify patterns in data and use these patterns to make intelligent decisions on new, unseen data. This approach differs radically from traditional programming, where developers must explicitly code every rule and condition.

Machine learning has become ubiquitous in modern technology. From recommendation systems on streaming platforms to fraud detection in banking, from medical diagnosis to autonomous vehicles, ML algorithms are quietly making decisions that affect our daily lives.

Types of Machine Learning

Supervised learning is perhaps the most common type of machine learning. In this approach, the algorithm learns from labeled training data, where each example includes both the input features and the correct output. The algorithm's goal is to learn a mapping function from inputs to outputs that can generalize to new, unseen examples.

Common supervised learning tasks include classification, where we predict discrete labels like spam or not spam, and regression, where we predict continuous values like house prices. Popular supervised learning algorithms include Linear Regression, Logistic Regression, Decision Trees, Random Forests, Support Vector Machines, and Neural Networks.

Unsupervised learning works with unlabeled data, seeking to discover hidden patterns or structures without predefined categories. The algorithm must find relationships and groupings in the data on its own. Key unsupervised learning techniques include clustering, dimensionality reduction, and anomaly detection.

Reinforcement learning involves an agent learning to make decisions by interacting with an environment. The agent receives rewards or penalties for its actions and learns to maximize cumulative reward over time. This approach is inspired by behavioral psychology and how humans and animals learn through trial and error.

Core Concepts in Machine Learning

Training data is the foundation of any machine learning model. The quality and quantity of training data directly impact model performance. Clean, accurate, and relevant data is essential, and generally, more data leads to better models, though there are diminishing returns.

Features are the individual measurable properties of the phenomena being observed. In machine learning, choosing the right features, known as feature engineering, is often more important than choosing the right algorithm. Features can be numerical, categorical, text-based, or time series data.

Model training is the process of finding the optimal parameters for a machine learning algorithm. This typically involves initializing model parameters, making predictions on training data, calculating the error between predictions and actual values, adjusting parameters to reduce error, and repeating until convergence.

Loss functions quantify how wrong the model's predictions are. Different problems require different loss functions. Mean Squared Error is common for regression problems, Cross-Entropy Loss is standard for classification problems, and custom loss functions can be designed for specific requirements.

Overfitting and underfitting are two major challenges in machine learning. Overfitting occurs when a model learns the training data too well, including its noise and peculiarities. Such models perform well on training data but poorly on new data. Underfitting happens when a model is too simple to capture the underlying patterns in the data.

Common Machine Learning Algorithms

Linear regression is one of the simplest and most interpretable machine learning algorithms. It models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to the observed data. The model assumes a linear relationship where the output is a weighted sum of inputs plus a bias term.

Decision trees make predictions by learning simple decision rules from data features. They partition the feature space into regions and assign a prediction to each region. While easy to understand and interpret, decision trees are prone to overfitting and can be unstable with small changes in data.

Neural networks are inspired by biological neural networks in the brain. They consist of layers of interconnected nodes that process and transform input data. Deep learning refers to neural networks with many hidden layers, capable of learning complex patterns. Key components include input layers, hidden layers, output layers, and activation functions.

Support Vector Machines find the optimal hyperplane that separates different classes with the maximum margin. They can efficiently handle high-dimensional spaces and use kernel tricks to solve non-linear problems. SVMs are particularly effective for classification tasks with clear margins of separation.

Random forests combine multiple decision trees to create a more robust and accurate model. Each tree is trained on a random subset of data and features, and predictions are made by averaging or voting. This ensemble approach reduces overfitting compared to single decision trees and provides feature importance measures.

Model Evaluation and Best Practices

Proper model evaluation is crucial for developing reliable machine learning systems. The most basic evaluation strategy involves splitting data into training and testing sets, ensuring the model is evaluated on data it hasn't seen during training. Cross-validation provides more robust evaluation by using multiple train-test splits.

Different problems require different evaluation metrics. For classification, we use accuracy, precision, recall, F1 score, and ROC-AUC. For regression, we use Mean Absolute Error, Mean Squared Error, Root Mean Squared Error, and R-squared. Choosing the right metric depends on the specific problem and business requirements.

Best practices for successful machine learning projects include starting simple with basic models before moving to complex ones, understanding your data through exploration and visualization, iterating quickly by building baseline models fast, monitoring performance throughout development, and documenting everything with detailed records of experiments.

The field of machine learning continues to evolve rapidly, with new techniques and applications emerging constantly. Whether you're interested in building intelligent applications, advancing scientific research, or understanding the technology shaping our world, machine learning offers exciting opportunities for those willing to learn and experiment.`;

export const sampleCoredoc = {
  document: {
    id: "ml-intro",
    title: "Introduction to Machine Learning",
    total_chunks: 8,
    root_chunk_id: "chunk_0",
    created_at: "2024-01-01T00:00:00Z",
    max_depth: 1,
    coverage_percentage: 100.0
  },
  chunks: [
    {
      id: "chunk_0",
      title: "Introduction to Machine Learning",
      content: "Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. Instead of following pre-written instructions, machine learning algorithms build mathematical models based on training data to make predictions or decisions.",
      summary: "Machine Learning enables systems to learn from experience without explicit programming.",
      keywords: [
        { term: "machine learning", importance_score: 0.95 },
        { term: "artificial intelligence", importance_score: 0.85 },
        { term: "algorithms", importance_score: 0.75 }
      ],
      embedded_links: [
        {
          keyword: "machine learning",
          target_page_id: "chunk_1",
          context_hint: "Learn about types of machine learning"
        },
        {
          keyword: "algorithms",
          target_page_id: "chunk_5",
          context_hint: "Explore common ML algorithms"
        }
      ],
      relationships: {
        parent: null,
        children: ["chunk_1", "chunk_2", "chunk_3", "chunk_4", "chunk_5", "chunk_6", "chunk_7"],
        prev: null,
        next: "chunk_1"
      },
      level: 0,
      character_count: 280
    },
    {
      id: "chunk_1",
      title: "Types of Machine Learning",
      content: "Supervised learning is perhaps the most common type of machine learning. In this approach, the algorithm learns from labeled training data, where each example includes both the input features and the correct output. Common supervised learning tasks include classification and regression.",
      summary: "Overview of different machine learning types including supervised, unsupervised, and reinforcement learning.",
      keywords: [
        { term: "supervised learning", importance_score: 0.9 },
        { term: "classification", importance_score: 0.8 },
        { term: "regression", importance_score: 0.8 }
      ],
      embedded_links: [
        {
          keyword: "supervised learning",
          target_page_id: "chunk_5",
          context_hint: "See examples of supervised learning algorithms"
        },
        {
          keyword: "training data",
          target_page_id: "chunk_3",
          context_hint: "Learn about training data importance"
        }
      ],
      relationships: {
        parent: "chunk_0",
        children: [],
        prev: "chunk_0",
        next: "chunk_2"
      },
      level: 1,
      character_count: 275
    },
    {
      id: "chunk_2",
      title: "Unsupervised and Reinforcement Learning",
      content: "Unsupervised learning works with unlabeled data, seeking to discover hidden patterns or structures without predefined categories. Reinforcement learning involves an agent learning to make decisions by interacting with an environment, receiving rewards or penalties for its actions.",
      summary: "Unsupervised learning finds patterns in unlabeled data, while reinforcement learning uses rewards and penalties.",
      keywords: [
        { term: "unsupervised learning", importance_score: 0.9 },
        { term: "reinforcement learning", importance_score: 0.9 },
        { term: "clustering", importance_score: 0.7 }
      ],
      embedded_links: [
        {
          keyword: "patterns",
          target_page_id: "chunk_0",
          context_hint: "How ML identifies patterns in data"
        }
      ],
      relationships: {
        parent: "chunk_0",
        children: [],
        prev: "chunk_1",
        next: "chunk_3"
      },
      level: 1,
      character_count: 280
    },
    {
      id: "chunk_3",
      title: "Core Concepts in Machine Learning",
      content: "Training data is the foundation of any machine learning model. The quality and quantity of training data directly impact model performance. Features are the individual measurable properties being observed. Model training involves finding optimal parameters through iterative optimization.",
      summary: "Essential concepts including training data, features, model training, and loss functions.",
      keywords: [
        { term: "training data", importance_score: 0.95 },
        { term: "features", importance_score: 0.9 },
        { term: "model training", importance_score: 0.85 }
      ],
      embedded_links: [
        {
          keyword: "model",
          target_page_id: "chunk_4",
          context_hint: "Understanding model evaluation"
        },
        {
          keyword: "optimization",
          target_page_id: "chunk_5",
          context_hint: "How algorithms optimize parameters"
        }
      ],
      relationships: {
        parent: "chunk_0",
        children: [],
        prev: "chunk_2",
        next: "chunk_4"
      },
      level: 1,
      character_count: 285
    },
    {
      id: "chunk_4",
      title: "Overfitting and Underfitting",
      content: "Overfitting occurs when a model learns the training data too well, including noise and peculiarities. Such models perform well on training data but poorly on new data. Underfitting happens when a model is too simple to capture the underlying patterns in the data.",
      summary: "Two major challenges in ML: overfitting (too complex) and underfitting (too simple).",
      keywords: [
        { term: "overfitting", importance_score: 0.95 },
        { term: "underfitting", importance_score: 0.9 },
        { term: "model performance", importance_score: 0.8 }
      ],
      embedded_links: [
        {
          keyword: "training data",
          target_page_id: "chunk_3",
          context_hint: "Role of training data in overfitting"
        },
        {
          keyword: "model",
          target_page_id: "chunk_6",
          context_hint: "Model evaluation techniques"
        }
      ],
      relationships: {
        parent: "chunk_0",
        children: [],
        prev: "chunk_3",
        next: "chunk_5"
      },
      level: 1,
      character_count: 265
    },
    {
      id: "chunk_5",
      title: "Common Machine Learning Algorithms",
      content: "Linear regression models relationships with linear equations. Decision trees partition feature space using decision rules. Neural networks use interconnected layers for complex patterns. Support Vector Machines find optimal separating hyperplanes. Random forests combine multiple decision trees.",
      summary: "Overview of popular ML algorithms including linear regression, decision trees, neural networks, SVMs, and random forests.",
      keywords: [
        { term: "linear regression", importance_score: 0.85 },
        { term: "decision trees", importance_score: 0.85 },
        { term: "neural networks", importance_score: 0.9 }
      ],
      embedded_links: [
        {
          keyword: "neural networks",
          target_page_id: "chunk_7",
          context_hint: "Deep learning and neural networks"
        },
        {
          keyword: "decision trees",
          target_page_id: "chunk_4",
          context_hint: "Avoiding overfitting in tree models"
        }
      ],
      relationships: {
        parent: "chunk_0",
        children: [],
        prev: "chunk_4",
        next: "chunk_6"
      },
      level: 1,
      character_count: 290
    },
    {
      id: "chunk_6",
      title: "Model Evaluation and Best Practices",
      content: "Proper model evaluation uses train-test splits and cross-validation. Classification metrics include accuracy, precision, recall, and F1 score. Regression uses MAE, MSE, and R-squared. Best practices: start simple, understand data, iterate quickly, monitor performance, document experiments.",
      summary: "Essential evaluation techniques and best practices for successful ML projects.",
      keywords: [
        { term: "model evaluation", importance_score: 0.95 },
        { term: "cross-validation", importance_score: 0.85 },
        { term: "best practices", importance_score: 0.8 }
      ],
      embedded_links: [
        {
          keyword: "model",
          target_page_id: "chunk_4",
          context_hint: "Preventing overfitting during evaluation"
        },
        {
          keyword: "performance",
          target_page_id: "chunk_3",
          context_hint: "Impact of data quality on performance"
        }
      ],
      relationships: {
        parent: "chunk_0",
        children: [],
        prev: "chunk_5",
        next: "chunk_7"
      },
      level: 1,
      character_count: 285
    },
    {
      id: "chunk_7",
      title: "Future of Machine Learning",
      content: "The field of machine learning continues to evolve rapidly, with new techniques and applications emerging constantly. Whether building intelligent applications, advancing research, or understanding technology shaping our world, machine learning offers exciting opportunities for those willing to learn.",
      summary: "Machine learning continues to evolve with new opportunities in various fields.",
      keywords: [
        { term: "machine learning", importance_score: 0.9 },
        { term: "applications", importance_score: 0.8 },
        { term: "opportunities", importance_score: 0.75 }
      ],
      embedded_links: [
        {
          keyword: "machine learning",
          target_page_id: "chunk_0",
          context_hint: "Return to ML introduction"
        },
        {
          keyword: "applications",
          target_page_id: "chunk_1",
          context_hint: "Types of ML applications"
        }
      ],
      relationships: {
        parent: "chunk_0",
        children: [],
        prev: "chunk_6",
        next: null
      },
      level: 1,
      character_count: 280
    }
  ]
};