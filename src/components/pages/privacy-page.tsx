"use client";

import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { ReactElement } from "react";

import { Email, EmailType } from "@components/misc/email";

export const PrivacyPage = (): ReactElement => (
    <Card>
        <CardHeader title="Politique de confidentialité" />
        <CardContent>
            <Typography gutterBottom>
                Cette politique de confidentialité divulgue&nbsp;:
            </Typography>
            <ul>
                <li>
                    Quand et comment nous collectons, utilisons et partageons vos informations
                </li>
                <li>
                    Quand et comment des réseaux publicitaires tiers peuvent collecter vos informations lorsque vous visitez lexiquequebecois.com
                </li>
                <li>
                    Quels sont vos droits en matière de confidentialité et comment vous pouvez les exercer.
                </li>
            </ul>
            <Typography gutterBottom>
                Votre utilisation du site Web est également soumise à nos conditions d&apos;utilisation.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Informations que nous recueillons
            </Typography>
            <Typography gutterBottom>
                Nous recueillons (1) les adresses courriels des personnes qui communiquent avec nous par courriel, (2) des informations globales concernant les pages auxquelles les utilisateurs accèdent ou qu&apos;ils visitent, (3) les informations que vous choisissez de nous envoyer (telles que les informations d&apos;enquête et/ou les inscriptions au site) et (4) les informations liées à votre utilisation du site, y compris l&apos;adresse IP, la localisation géographique approximative, ainsi que la date et l&apos;heure de votre demande.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Comment nous utilisons vos informations
            </Typography>
            <Typography gutterBottom>
                Nous recueillons vos informations afin d&apos;améliorer le contenu de notre site web, d&apos;améliorer la qualité de notre service, de vous fournir des services, d&apos;identifier et d&apos;authentifier nos utilisateurs, de vous contacter si nécessaire ou avec votre permission. Nous pouvons également utiliser vos informations anonymes à des fins de recherche.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Quand nous partageons vos informations
            </Typography>
            <Typography gutterBottom>
                Nous ne partageons ni ne vendons vos informations à d&apos;autres organisations à des fins commerciales, sauf pour fournir les produits ou services que vous avez demandés, lorsque nous avons votre permission, ou dans les circonstances suivantes&nbsp;:
            </Typography>
            <ul>
                <li>
                    S&apos;il est nécessaire de partager des informations afin d&apos;enquêter, de prévenir ou de prendre des mesures concernant des activités illégales, des suspicions de fraude, des situations impliquant des menaces potentielles pour la sécurité physique de toute personne, des violations des conditions de service, ou si la loi l&apos;exige.
                </li>
                <li>
                    Si le site Web est acquis par ou fusionné avec une autre société, nous transférerons vos informations avec le site Web. Dans ce cas, le site Web vous informera à l&apos;avance du transfert et des modifications apportées à ces conditions sur le site Web et, si possible, par courriel.
                </li>
                <li>
                    Nous pouvons fournir ces informations à des entreprises ou des personnes de confiance dans le seul but de traiter les informations d&apos;identification personnelle en notre nom. Lorsque cela est fait, cela est soumis à des accords qui obligent ces parties à traiter ces informations uniquement sur nos instructions et en conformité avec la présente politique de confidentialité et les mesures de confidentialité et de sécurité appropriées.
                </li>
                <li>
                    Nous pouvons fournir ces informations à une société contrôlée par, ou sous contrôle commun avec, Lexique Québécois à toute fin autorisée par la présente politique de confidentialité.
                </li>
            </ul>
            <Typography
                variant="h3"
                gutterBottom
            >
                Informations que nous vendons
            </Typography>
            <Typography gutterBottom>
                Nous ne vendons pas les informations personnelles que nous recueillons. Nos partenaires de gestion publicitaire (&quot;partenaires publicitaires&quot;) peuvent toutefois recueillir des informations directement auprès de vous lorsque vous visitez notre site Web, en utilisant des technologies telles que les cookies et les balises Web.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Demandes de communication et demandes de suppression
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Vous pouvez demander la divulgation et/ou la suppression de toute information que nous avons recueillie à votre sujet, en nous envoyant un courriel contenant les détails de votre demande à l&apos;adresse suivante&nbsp;: <Email type={EmailType.Support} />.
            </Typography>
            <Typography gutterBottom>
                Nous vous contacterons après réception de votre demande pour vérifier votre identité et traiter votre demande. Veuillez noter que les demandes sont examinées au cas par cas et sont soumises aux exigences légales et à une vérification adéquate de l&apos;identité.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Cookies
            </Typography>
            <Typography gutterBottom>
                Un cookie est une petite quantité de données, qui comprend souvent un identifiant unique anonyme, envoyée à votre navigateur depuis les ordinateurs d&apos;un site web et stockée sur le disque dur de votre ordinateur. Les cookies peuvent être nécessaires pour utiliser le site Web. Lexique Québécois et ses partenaires publicitaires utilisent des cookies pour enregistrer des informations sur la session en cours.
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Nos Partenaires publicitaires peuvent également, de temps à autre, utiliser des balises Web (également connues sous le nom de <i>web beacons</i>, <i>Internet tags</i>, <i>pixel tags</i> et <i>clear GIFS</i>). Ces balises web sont fournies par nos Partenaires publicitaires et permettent à ces derniers d&apos;obtenir des informations telles que l&apos;adresse IP de l&apos;ordinateur qui a téléchargé la page sur laquelle la balise apparaît, l&apos;URL de la page sur laquelle la balise apparaît, l&apos;heure à laquelle la page contenant la balise a été consultée, le type de navigateur utilisé pour consulter la page et les informations contenues dans les cookies définis par les Partenaires publicitaires. Les balises web permettent à nos partenaires publicitaires de reconnaître un cookie unique sur votre navigateur web, ce qui nous permet de savoir quelles publicités amènent les utilisateurs sur notre site web.
            </Typography>
            <Typography gutterBottom>
                Avec les cookies et la technologie des balises web, les informations que nous collectons et partageons sont anonymes et non identifiables personnellement. Elles ne contiennent pas votre nom, votre adresse, votre numéro de téléphone ou votre adresse courriel.
            </Typography>
            <Typography
                variant="h4"
                gutterBottom
            >
                hCaptcha
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line, react/jsx-max-props-per-line */}
                Nous utilisons le service anti-robot hCaptcha (ci-après &ldquo;hCaptcha&rdquo;) sur notre site web. Ce service est fourni par Intuition Machines, Inc., une société américaine de Delaware (&ldquo;IMI&rdquo;). hCaptcha est utilisé pour vérifier si les données entrées sur notre site web (comme sur une page de connexion ou un formulaire de contact) ont été entrées par un humain ou par un programme automatisé. Pour ce faire, hCaptcha analyse le comportement du visiteur du site web en fonction de diverses caractéristiques. Cette analyse commence automatiquement dès que le visiteur du site web entre une partie du site web avec hCaptcha activé. Pour l&apos;analyse, hCaptcha évalue diverses informations (par exemple, l&apos;adresse IP, le temps que le visiteur a passé sur le site web ou l&apos;application, ou les mouvements de souris effectués par l&apos;utilisateur). Les données collectées pendant l&apos;analyse seront transmises à IMI. L&apos;analyse hCaptcha en mode &ldquo;invisible&rdquo; peut avoir lieu complètement en arrière-plan. Les visiteurs du site web ne sont pas informés que cette analyse a lieu si l&apos;utilisateur n&apos;est pas confronté à un défi. Le traitement des données est basé sur l&apos;Article 6(1)(f) du RGPD (DSGVO) : l&apos;exploitant du site web a un intérêt légitime à protéger son site contre les crawling automatisés abusifs et le spam. IMI agit en tant que &ldquo;traitant de données&rdquo; agissant en tant que représentant de ses clients tels que définis dans le RGPD et en tant que &ldquo;prestataire de services&rdquo; aux fins du California Consumer Privacy Act (CCPA). Pour plus d&apos;informations sur hCaptcha et la politique de confidentialité et les conditions d&apos;utilisation d&apos;IMI, veuillez consulter les liens suivants : <Link href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer">https://www.hcaptcha.com/privacy</Link> et <Link href="https://www.hcaptcha.com/terms" target="_blank" rel="noopener noreferrer">https://www.hcaptcha.com/terms</Link>.
            </Typography>
            <Typography
                variant="h4"
                gutterBottom
            >
                Amplitude
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line, react/jsx-max-props-per-line */}
                Nous utilisons Amplitude Analitics (ci-après &ldquo;Amplitude&rdquo;) sur notre site web. Amplitude est un service d&apos;analyse qui nous aide à comprendre comment les utilisateurs interagissent avec notre site web. Nous utilisons ces informations pour améliorer notre site web. Les données collectées sont anonymisées et ne sont pas utilisées pour suivre les utilisateurs individuels. Le traitement des données est basé sur l&apos;article 6(1)(f) du RGPD (DSGVO) : l&apos;exploitant du site web a un intérêt légitime à améliorer l&apos;expérience utilisateur et à optimiser son site web. Pour plus d&apos;informations sur la politique de confidentialité d&apos;Amplitude, veuillez consulter le lien suivant&nbsp;: <Link href="https://amplitude.com/privacy" target="_blank" rel="noopener noreferrer">https://amplitude.com/privacy</Link>.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Stockage des données
            </Typography>
            <Typography gutterBottom>
                Lexique Québécois fait appel à des fournisseurs tiers et à des partenaires d&apos;hébergement pour fournir le matériel, les logiciels, les réseaux, le stockage et les technologies connexes nécessaires au fonctionnement du site Web. Lexique Québécois est propriétaire du code, des bases de données et de tous les droits relatifs au site Web.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Sécurité
            </Typography>
            <Typography gutterBottom>
                Nous prenons des précautions pour assurer la sécurité de vos informations personnelles. Toutefois, nous ne pouvons pas garantir que des pirates informatiques ou du personnel non autorisé puissent avoir accès à vos informations personnelles malgré nos efforts. Vous devez savoir qu&apos;en utilisant le site Web, vos informations transiteront probablement par des infrastructures tierces qui ne sont pas sous notre contrôle.
            </Typography>
            <Typography gutterBottom>
                Nous ne pouvons pas protéger, et la présente politique de confidentialité ne s&apos;applique pas aux informations que vous transmettez à d&apos;autres utilisateurs. Vous ne devez jamais transmettre d&apos;informations personnelles ou d&apos;identification à d&apos;autres utilisateurs.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Enfants
            </Typography>
            <Typography gutterBottom>
                Le site Web n&apos;est pas destiné aux enfants de moins de 13 ans, et nous ne recueillons pas sciemment d&apos;informations auprès d&apos;enfants de moins de 13 ans.
            </Typography>
            <Typography gutterBottom>
                Les enfants âgés de 13 ans ou plus ne peuvent pas soumettre d&apos;informations personnelles sans l&apos;autorisation de leurs parents ou tuteurs. En utilisant le site Web, vous déclarez avoir au moins 18 ans, ou avoir au moins 13 ans et avoir l&apos;autorisation de vos parents ou tuteurs d&apos;utiliser le service.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Changements
            </Typography>
            <Typography gutterBottom>
                Le site Web peut périodiquement mettre à jour cette politique. Nous pouvons vous informer de changements importants dans la façon dont nous traitons les renseignements personnels en plaçant un avis bien visible sur notre site.
            </Typography>
            <Typography
                variant="h3"
                gutterBottom
            >
                Questions
            </Typography>
            <Typography gutterBottom>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Toute question concernant la présente politique de confidentialité doit être adressée à l&apos;adresse suivante&nbsp;: <Email type={EmailType.Legal} />.
            </Typography>
            <Typography
                variant="subtitle2"
                align="right"
            >
                Mis à jour le 24 mars 2022
            </Typography>
        </CardContent>
    </Card>
);
