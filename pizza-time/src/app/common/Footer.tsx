import Link from 'next/link';
import Image from 'next/image';
import { MdFacebook } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';
import FooterMobile from './FooterMobile';

const Footer = () => {
    const Year = new Date().getFullYear();
    return (
        <footer className="bg-gray-800 text-white"> 
                <FooterMobile/>
                <section className="hidden md:flex justify-around items-center border-t border-gray-100 py-12 px-12">
                <div>
                    <h2 className="items-center">Téléchargez notre application</h2>
                    <Link href="https://play.google.com/store/apps/details?id=com.softavera.pizzatime&hl=ln">
                        <Image src="/ImgFooter/GooglePlay.png" alt="logo" width={120} height={120} />
                    </Link>
                    <Link href="https://apps.apple.com/us/app/pizza-time-france/id1556496063">
                        <Image src="/ImgFooter/AppStore.png" alt="logo" width={120} height={120} />
                    </Link>
                </div>
                <div className="flex flex-col space-y-2">
                    <Link href="/Politique de confidentialité">Mentions Légales</Link>
                    <Link href="/Politique de confidentialité">Politique de confidentialité</Link>
                    <Link href="/CGV">CGV</Link>
                    <Link href="/CGU">CGU</Link>
                </div>
                <div className="flex flex-col space-y-2">
                    <h4 className="font-semibold">Suivez Nous</h4>
                    <Link href="/Facebook"><MdFacebook size={24} /></Link>
                    <Link href="/Instagram"><AiFillInstagram size={24} /></Link>
                </div>
            </section>
            <section className="hidden md:flex py-12 px-12 justify-center">
                <div className="flex flex-col items-center text-center">
                    <p>Tous droits réservés - &copy; {Year}</p>
                    <p className="text-sm">Softavera N°1 des solutions d'encaissement, caisse tactile, borne de commande, click & collect site web commande en ligne...,plus d’infos :</p>
                    <Link href="www.softavera.fr">www.softavera.fr</Link>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
