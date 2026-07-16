import { START, StateGraph, END } from "@langchain/langgraph";

import { classificationNode } from "./nodes/classification.node";
import { ContractStateAnnotation } from "./contract.state";
import { extractionNode } from "./nodes/extraction.node";
import { clauseNode } from "./nodes/clause.node";
import { riskNode } from "./nodes/risk.node";
import { missingClauseNode } from "./nodes/missingClause.node";
import { riskScoreNode } from "./nodes/riskScoore.node";
import { summaryNode } from "./nodes/summary.node";
import { recommendationNode } from "./nodes/recommendation.node";



const graph = new StateGraph(ContractStateAnnotation)
    .addNode("classification", classificationNode)
    .addEdge(START, "classification")
    .addNode("extraction", extractionNode)
    .addEdge("classification", "extraction")
    .addNode("clause", clauseNode)
    .addEdge("extraction", "clause")
    .addNode("analyze_risk", riskNode)
    .addEdge("clause", "analyze_risk")
    .addNode("missingClause", missingClauseNode)
    .addEdge("analyze_risk", "missingClause")
    .addNode("riskScoreCal",riskScoreNode)
    .addEdge("missingClause", "riskScoreCal")
    .addNode("summaryNode",summaryNode)
    .addEdge( "riskScoreCal","summaryNode")
    .addNode("recommendationNode",recommendationNode)
    .addEdge("summaryNode","recommendationNode")
    .addEdge("recommendationNode", END);

export const contractGraph = graph.compile();