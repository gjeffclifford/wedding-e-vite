import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { getWeddingBySlug } from "./config/weddings";
import { InvitationPage } from "./pages/InvitationPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function WeddingRoute() {
  const { weddingSlug } = useParams();
  const wedding = weddingSlug ? getWeddingBySlug(weddingSlug) : undefined;
  if (!wedding) return <NotFoundPage />;
  return <InvitationPage wedding={wedding} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/w/allyzza-kenneth" replace />} />
      <Route path="/w/:weddingSlug" element={<WeddingRoute />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
