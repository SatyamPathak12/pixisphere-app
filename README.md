                                  Pixisphere Frontend Assignment----

Setup Instructions--
Clone the repo--- git clone https://github.com/satyampathak12/pixisphere-app.git
cd pixisphere-app

Install dependencies  --- npm install

Start the dev server ---  npm run dev

Start JSON Server for mock API --- npm run backend


Features & Logic---------

    Search bar supports partial matches on name, location, and tags.

    Filters include:

        Price range (slider)

        Minimum rating

        Style checkboxes (e.g. Traditional, Candid)

        City selector

    Sort options include:

        Price (Low to High)

        Rating (High to Low)

        Recently Added



Debounced Search-----

    To avoid unnecessary re-renders and improve UX:

    Used lodash.debounce to delay filtering until user stops typing.




UI/UX Touches-----

    Skeleton loaders from @shadcn/ui/skeleton show while fetching.

    Smart suggestions: Top 3 highest-rated photographers shown first when no search is applied.

    responsive layout with Tailwind.


Tech Stack--- 

    React + Vite

    Tailwind CSS

    shadcn/ui

    Zustand for global state

    Fuse.js for fuzzy search

    Lodash.debounce for input optimization

    JSON Server as mock backend



