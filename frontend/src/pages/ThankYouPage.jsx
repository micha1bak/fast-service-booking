export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        Dziękujemy za rezerwację 🎉
      </h1>
      <p className="text-gray-700 mb-6">
        Twoja rezerwacja została przyjęta. Wkrótce otrzymasz potwierdzenie na e-mail.
      </p>
      <a
        href="/"
        className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        Wróć na stronę główną
      </a>
    </div>
  );
}
