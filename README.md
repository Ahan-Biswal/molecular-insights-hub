# Molecular Insights Hub

ok so a website designed for both mobile and pc screens is do be made .. the client is doing its phd and this website is to showcase the above excel sheet as information , the title of this website will be "Molecular Docking studies of  Enterobacteriae  outer membrane with common antibiotics and dyes" ... the function of the website is as follows , so there will be a search bar for entering the genus and when the user clicks on it a dialog box opens up showing all the genus in the excel sheet ( no duplicasy required ). when the user selects a genus and enter the protein id will be used in the excel will be fetched from pdb API and show the 3d structure ( and it should be interactable you can integrate mol* in it ) and then all ligand info with 2d structure from pubchem ( add rdkit as fallback if pubchem doesnot have a 2d structure ) then the binding score as well as the with it add a mol* structure viewer in which the interaction will be shown i will provide you the pdfs you just have to add those ( its still in process , so you generate the full website then i will provide you ) ... with this some information from valid sources you can show it ... now keep the colours minimal but not generic (blue and white ) , can use minimalism and glassmorphism for this ( if you have any better suggestion about the whole website you can suggest me in the plan )

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1fe8d818-5094-4f5e-8891-a77328d5efee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
