import { Suspense } from "react";
import DocumentViewer from "@/components/document/DocumentViewer";
import { apiClient } from "@/lib/api";

async function DocumentViewerWrapper({ documentId }: { documentId: string }) {
  const document = await apiClient.getDocument(documentId);
  return <DocumentViewer document={document} />;
}

export default async function ViewerPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading document...</p>
          </div>
        </div>
      }
    >
      <DocumentViewerWrapper documentId={id} />
    </Suspense>
  );
}