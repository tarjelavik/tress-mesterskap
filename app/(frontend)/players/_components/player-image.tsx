import cn from "classnames";
import Link from "next/link";
import { urlForImage } from "../../../../lib/sanity.image";

export default function PlayerImage({ title, url, slug }: {
  title: any;
  url: any;
  slug?: any;
}) {
  const image = (
    <img
      width={400}
      height={400}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={urlForImage(url).height(400).width(400).url()}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/players/${slug}`} href="/match/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
