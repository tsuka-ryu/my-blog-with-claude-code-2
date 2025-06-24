import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-16 text-center'>
      <div className='font-mono'>
        <h1 className='text-6xl font-bold text-red-400 mb-4'>404</h1>
        <h2 className='text-2xl text-green-400 mb-4'>記事が見つかりません</h2>
        <p className='text-gray-400 mb-8'>
          指定された記事は存在しないか、削除された可能性があります。
        </p>
        <Link
          href='/posts'
          className='inline-block px-6 py-3 bg-green-600 text-black hover:bg-green-500 transition-colors font-bold rounded'
        >
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
