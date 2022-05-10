import Head from "next/head";
import { ReactElement } from "react";

import { Card } from "@components/misc/card";
import { Email } from "@components/typography/email";
import { Footing } from "@components/typography/footing";
import { Heading } from "@components/typography/heading";
import { Hyperlink } from "@components/typography/hyperlink";
import { List } from "@components/typography/list";
import { ListItem } from "@components/typography/list-item";
import { Paragraph } from "@components/typography/paragraph";
import { Section } from "@components/typography/section";
import { Subheading } from "@components/typography/subheading";
import { Title } from "@components/typography/title";

export const ConditionsPage = (): ReactElement => (
    <>
        <Head>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <title>Conditions - Lexique Québécois</title>
        </Head>
        <Card>
            <Title>
                Conditions d&apos;utilisation
            </Title>
            <Section>
                <Paragraph>
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    Kevin Pastor (la &quot;société&quot;) propose Lexique Québécois (le &quot;site Web&quot;) conformément aux conditions de service déclarées ci-dessous. La société se réserve le droit de réviser ces conditions de temps à autre. Nous publierons un avis de toute révision importante sur le site Web. En continuant à utiliser le site Web, vous acceptez les présentes conditions. Les questions relatives aux conditions de service peuvent être envoyées à l&apos;adresse suivante&nbsp;: <Email value="info@lexiquequebecois.com" />.
                </Paragraph>
            </Section>
            <Section>
                <Heading>
                    Modalités d&apos;utilisation
                </Heading>
                <Paragraph>
                    Le site Web n&apos;est pas adapté à tous les publics. Son contenu est souvent présenté d&apos;une manière grossière et directe que certains peuvent trouver offensante. Si vous ne vous considérez pas comme un utilisateur approprié ou si vous êtes offensé, veuillez ne pas visiter le site Web.
                </Paragraph>
                <Paragraph>
                    Le site Web n&apos;est pas destiné aux enfants de moins de 13 ans. En utilisant le site Web, vous déclarez que vous avez au moins 18 ans, ou que vous avez au moins 13 ans et que vous avez l&apos;autorisation de vos parents pour utiliser le site Web.
                </Paragraph>
                <Paragraph>
                    Vous ne pouvez pas utiliser le site Web pour toute activité illégale ou pour violer les lois en vigueur dans votre juridiction.
                </Paragraph>
                <Paragraph>
                    Vous ne pouvez pas exploiter le site Web pour accéder à des informations non autorisées.
                </Paragraph>
                <Paragraph>
                    La société se réserve le droit de modifier, suspendre ou interrompre le site Web pour quelque raison que ce soit, avec ou sans préavis.
                </Paragraph>
                <Paragraph>
                    Le site Web est fourni &quot;tel quel&quot; et &quot;tel que disponible&quot;. Vous assumez l&apos;entière responsabilité et les risques liés à votre utilisation du site Web. La société ne garantit pas que (1) le site Web répondra à vos besoins, (2) que vous serez satisfait du site Web, (3) que vous serez en mesure d&apos;utiliser le site Web à tout moment, (4) que le site Web sera exempt d&apos;erreurs, (5) ou que toute erreur sera corrigée.
                </Paragraph>
                <Paragraph>
                    La société n&apos;est pas responsable de tout dommage ou perte résultant de votre utilisation du site Web.
                </Paragraph>
                <Paragraph>
                    La société n&apos;est pas responsable des dommages ou des pertes résultant de la transmission par le site Web d&apos;informations telles que des messages personnels sur des réseaux non cryptés tels que le courrier électronique.
                </Paragraph>
                <Paragraph>
                    Tout manquement de la société à faire valoir ou à exercer un droit prévu dans les présentes conditions ne constitue pas une renonciation à ce droit.
                </Paragraph>
                <Paragraph>
                    Si l&apos;une des dispositions des présentes conditions d&apos;utilisation est jugée invalide ou inapplicable, les autres conditions restent applicables.
                </Paragraph>
                <Paragraph>
                    Les présentes conditions de service constituent l&apos;intégralité de l&apos;accord entre vous et la société et remplacent tous les accords antérieurs, écrits ou oraux, entre vous et la société, y compris les versions précédentes des conditions de service.
                </Paragraph>
            </Section>
            <Section>
                <Heading>
                    Conduite des utilisateurs
                </Heading>
                <Paragraph>
                    Les utilisateurs ne peuvent pas publier sur le site Web des mots, des définitions ou d&apos;autres informations (collectivement, le &quot;contenu&quot;) qui&nbsp;:
                </Paragraph>
                <List>
                    <ListItem>
                        est illégal, menaçant, calomnieux ou diffamatoire;
                    </ListItem>
                    <ListItem>
                        viole la propriété intellectuelle d&apos;un tiers; ou
                    </ListItem>
                    <ListItem>
                        est préjudiciable à la qualité ou à l&apos;esprit du site Web.
                    </ListItem>
                </List>
                <Paragraph>
                    Les exemples de contenus ou de comportements inacceptables sur le site Web sont ceux que nous considérons, à notre seule discrétion, comme constituant&nbsp;:
                </Paragraph>
                <List>
                    <ListItem>
                        un abus, un harcèlement, des menaces de violence, une intimidation de toute personne ou organisation, ou tout autre comportement menaçant;
                    </ListItem>
                    <ListItem>
                        s&apos;engager ou contribuer à toute activité illégale ou qui viole les droits d&apos;autrui;
                    </ListItem>
                    <ListItem>
                        fournir des informations fausses, trompeuses ou inexactes;
                    </ListItem>
                    <ListItem>
                        pirater ou modifier le site Web pour faire croire à une association avec la société;
                    </ListItem>
                    <ListItem>
                        sous-entendre ou prétendre être affilié à une société ou une organisation à laquelle vous n&apos;êtes pas affilié, ou déformer l&apos;étendue de votre affiliation ou de votre rôle dans une société ou une organisation affiliée; ou
                    </ListItem>
                    <ListItem>
                        divulguer des informations personnelles ou exclusives d&apos;un autre utilisateur, personne ou organisation.
                    </ListItem>
                </List>
                <Paragraph>
                    La société a le droit, mais non l&apos;obligation, de limiter ou de révoquer les privilèges d&apos;utilisation de toute personne qui publie un contenu inacceptable.
                </Paragraph>
                <Paragraph>
                    À tout moment, la société peut, à sa seule discrétion, refuser d&apos;autoriser la publication d&apos;un contenu ou supprimer un contenu qui a été publié. Toutefois, la société n&apos;est pas tenue de restreindre ou de surveiller les soumissions de quelque manière que ce soit, ni de bloquer les utilisateurs qui soumettent un contenu inapproprié.
                </Paragraph>
                <Paragraph>
                    En publiant du contenu, vous déclarez et garantissez que ce contenu&nbsp;:
                </Paragraph>
                <List>
                    <ListItem>
                        ne viole pas les droits d&apos;un tiers, y compris, mais sans s&apos;y limiter, les droits de propriété intellectuelle et les droits de propriété;
                    </ListItem>
                    <ListItem>
                        n&apos;est pas frauduleux et ne comporte pas d&apos;informations ou d&apos;articles contrefaits ou volés;
                    </ListItem>
                    <ListItem>
                        n&apos;enfreint aucune loi, statut, ordonnance ou règlement; et
                    </ListItem>
                    <ListItem>
                        ne doit pas créer de responsabilité pour la société ou l&apos;un de ses parents, filiales, sociétés affiliées, successeurs, cessionnaires, employés, agents, directeurs, responsables et actionnaires respectifs.
                    </ListItem>
                </List>
                <Paragraph>
                    Vous ne pouvez pas soumettre de contenu en utilisant des méthodes automatisées non autorisées (&quot;bots&quot;).
                </Paragraph>
                <Paragraph>
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    La société ne contrôle pas et ne peut pas contrôler tout le contenu publié par des tiers sur le site Web, et ne garantit pas l&apos;exactitude, l&apos;intégrité ou la qualité de ce contenu. Vous comprenez qu&apos;en utilisant le site Web, vous pouvez être exposé à du contenu que vous pouvez trouver offensant, indécent, incorrect ou répréhensible, et vous acceptez qu&apos;en aucun cas la société ne soit responsable de quelque manière que ce soit du contenu, y compris des erreurs ou omissions dans le contenu, ou de toute perte ou dommage de quelque nature que ce soit résultant de votre utilisation du contenu. Si vous souhaitez signaler des éléments répréhensibles, vous pouvez le problème à l&apos;adresse suivante&nbsp;: <Email value="info@lexiquequebecois.com" /> {/* TODO Replace with legal@lexiquequebecois.com */}.
                </Paragraph>
                <Paragraph>
                    Vous êtes seul responsable de tout contenu que vous publiez sur le site Web, ainsi que des conséquences de la publication de ce contenu. Vous acceptez d&apos;indemniser, de défendre et de dégager de toute responsabilité la société, ses dirigeants, ses administrateurs, ses employés et ses agents en cas de réclamations, pertes, coûts, responsabilités, dommages, jugements, pénalités, intérêts et dépenses (y compris les honoraires d&apos;avocat raisonnables) découlant de ou liés à (1) toute violation réelle ou présumée de vos déclarations, garanties ou obligations énoncées dans les présentes conditions d&apos;utilisation, et (2) toute violation réelle ou présumée de tout droit de propriété intellectuelle ou de propriété par tout contenu ou toute autre information que vous publiez sur le site Web.
                </Paragraph>
                <Paragraph>
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    L&apos;utilisation du site Web est également régie par notre politique de confidentialité, dont une copie se trouve actuellement à l&apos;adresse suivante&nbsp;: <Hyperlink href="/confidentialite">https://lexiquequebecois.com/confidentialite</Hyperlink>.
                </Paragraph>
            </Section>
            <Section>
                <Heading>
                    Droits d&apos;auteur et propriété
                </Heading>
                <Paragraph>
                    La société détient les droits de propriété intellectuelle sur le site Web et tous ses éléments, y compris, mais sans s&apos;y limiter, la conception, les illustrations, les fonctionnalités et la documentation. Il vous est interdit de copier, modifier ou désosser toute partie du site Web appartenant à la société.
                </Paragraph>
                <Paragraph>
                    Dans la mesure où vous détenez des droits sur le contenu que vous publiez sur le site Web, ces droits vous appartiennent uniquement et exclusivement.
                </Paragraph>
                <Paragraph>
                    Lorsque vous publiez du contenu sur le site Web, vous accordez à la société une licence irrévocable, perpétuelle, mondiale, libre de droits, pouvant faire l&apos;objet d&apos;une sous-licence complète et non exclusive, l&apos;autorisant à copier, distribuer, vendre, afficher publiquement, exécuter publiquement et créer des œuvres dérivées de votre contenu sur le site Web et sur les services affiliés au site Web et ailleurs (y compris, mais sans s&apos;y limiter, sur des supports imprimés, vidéo, audio ou informatiques), quelle que soit la forme du support utilisé ou que ces supports ou services existent actuellement ou soient développés à l&apos;avenir. En publiant du contenu sur le site Web, vous déclarez et garantissez par les présentes que vous disposez de tous les droits nécessaires pour publier ce contenu et accorder la licence susmentionnée à la société. La société respecte la propriété intellectuelle d&apos;autrui. Elle peut, dans des circonstances appropriées et à sa discrétion, désactiver et/ou résilier les comptes des utilisateurs qui enfreignent de manière répétée les droits d&apos;autrui.
                </Paragraph>
                <Paragraph>
                    Si vous pensez que votre travail a été copié d&apos;une manière qui constitue une violation des droits d&apos;auteur, ou que vos droits de propriété intellectuelle ont été autrement violés, veuillez fournir les informations suivantes à l&apos;agent chargé des droits d&apos;auteur de la société&nbsp;:
                </Paragraph>
                <List>
                    <ListItem>
                        une signature électronique ou physique de la personne autorisée à agir au nom du propriétaire du droit d&apos;auteur ou de tout autre intérêt de propriété intellectuelle;
                    </ListItem>
                    <ListItem>
                        une description de l&apos;œuvre protégée par le droit d&apos;auteur ou de toute autre propriété intellectuelle dont vous affirmez qu&apos;elle a été violée;
                    </ListItem>
                    <ListItem>
                        une description de l&apos;endroit où se trouve sur le site le matériel qui, selon vous, constitue une infraction;
                    </ListItem>
                    <ListItem>
                        votre adresse, votre numéro de téléphone et votre adresse électronique;
                    </ListItem>
                    <ListItem>
                        une déclaration de votre part indiquant que vous pensez de bonne foi que l&apos;utilisation contestée n&apos;est pas autorisée par le propriétaire du droit d&apos;auteur, son agent ou la loi; et
                    </ListItem>
                    <ListItem>
                        une déclaration de votre part, faite sous peine de parjure, selon laquelle les informations ci-dessus dans votre notification sont exactes et que vous êtes le propriétaire du droit d&apos;auteur ou de la propriété intellectuelle ou que vous êtes autorisé à agir au nom du propriétaire du droit d&apos;auteur ou de la propriété intellectuelle.
                    </ListItem>
                </List>
                <Paragraph>
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    L&apos;agent de la société chargé de notifier les réclamations relatives aux droits d&apos;auteur ou à toute autre violation de la propriété intellectuelle peut être contacté à l&apos;adresse suivante&nbsp;: <Email value="info@lexiquequebecois.com" />{/* TODO Replace with legal@lexiquequebecois.com */}.
                </Paragraph>
            </Section>
            <Section>
                <Heading>
                    Avis de non-responsabilité
                </Heading>
                <Paragraph>
                    La société n&apos;examine pas et ne peut pas examiner tout le contenu publié sur le site Web ou créé par les utilisateurs accédant au site Web, et n&apos;est en aucun cas responsable du contenu de ce contenu ou des activités de ces utilisateurs.
                </Paragraph>
                <Paragraph>
                    Vous reconnaissez qu&apos;en vous donnant la possibilité de visualiser et de distribuer du contenu généré par les utilisateurs sur le site Web, la société agit simplement comme un canal passif pour la distribution de ces informations et n&apos;assume aucune obligation ou responsabilité concernant le contenu ou les activités des utilisateurs du site Web.
                </Paragraph>
                <Paragraph>
                    La société et ses sociétés mères, filiales, sociétés affiliées, successeurs, ayants droit, employés, agents, directeurs, responsables et actionnaires respectifs ne s&apos;engagent pas à surveiller le contenu inapproprié du site Web et n&apos;assument aucune obligation à cet égard.
                </Paragraph>
                <Paragraph>
                    La société et ses sociétés mères, filiales, sociétés affiliées, successeurs, cessionnaires, employés, agents, directeurs, cadres et actionnaires respectifs n&apos;assument aucune responsabilité qui pourrait découler de son contenu, y compris, mais sans s&apos;y limiter, les réclamations pour diffamation, calomnie, violation, atteinte à la vie privée et aux droits de publicité, obscénité, pornographie, blasphème, fraude ou fausse déclaration.
                </Paragraph>
            </Section>
            <Section>
                <Heading>
                    Politique relative aux idées non sollicitées
                </Heading>
                <Paragraph>
                    La société ou l&apos;un de ses employés n&apos;accepte ni ne prend en considération les idées non sollicitées, notamment les idées de nouvelles campagnes publicitaires, de nouvelles promotions, de produits ou technologies nouveaux ou améliorés, d&apos;améliorations de produits, de processus, de matériaux, de plans de marketing ou de nouveaux noms de produits. Veuillez ne pas soumettre d&apos;idées non sollicitées, de créations artistiques originales, de suggestions ou d&apos;autres travaux (&quot;soumissions&quot;) sous quelque forme que ce soit à la société ou à l&apos;un de ses employés. Le seul but de cette politique est d&apos;éviter tout malentendu ou litige potentiel lorsque les produits ou les stratégies de marketing de la société peuvent sembler similaires aux idées soumises à la société. Si, malgré notre demande de ne pas nous envoyer vos idées, vous les soumettez quand même, alors, indépendamment de ce que dit votre lettre, les conditions suivantes s&apos;appliqueront à vos soumissions.
                </Paragraph>
                <Subheading>
                    Conditions de soumission d&apos;idées
                </Subheading>
                <Paragraph>
                    Vous acceptez que&nbsp;: (1) vos soumissions et leur contenu deviendront automatiquement la propriété du site Web, sans aucune compensation pour vous; (2) le site Web peut utiliser ou redistribuer les soumissions et leur contenu à n&apos;importe quelle fin et de n&apos;importe quelle manière; (3) il n&apos;y a aucune obligation pour la société d&apos;examiner la soumission; et (4) il n&apos;y a aucune obligation de garder les soumissions confidentielles.
                </Paragraph>
            </Section>
            <Section>
                <Heading>
                    Commentaires et informations
                </Heading>
                <Paragraph>
                    Tout commentaire que vous fournissez sur ce site sera considéré comme non confidentiel. La site Web sera libre d&apos;utiliser ces informations sans restriction.
                </Paragraph>
            </Section>
            <Section>
                <Heading>
                    Publicité
                </Heading>
                <Paragraph>
                    Nous faisons appel à des sociétés de publicité tierces pour diffuser des annonces lorsque vous visitez le site Web. Ces sociétés peuvent utiliser des informations agrégées (à l&apos;exclusion de votre nom, de votre adresse, de votre adresse électronique ou de votre numéro de téléphone) concernant vos visites sur ce site et sur d&apos;autres sites Web afin de vous proposer des publicités sur des biens et services susceptibles de vous intéresser. Si vous souhaitez obtenir de plus amples informations sur cette pratique et connaître vos choix quant à l&apos;utilisation de ces informations par ces sociétés, visitez l&apos;un des sites suivants&nbsp;:
                </Paragraph>
                <List>
                    <ListItem>
                        <Hyperlink
                            href="https://thenai.org/opt-out/"
                            breakText
                        >
                            https://thenai.org/opt-out/
                        </Hyperlink>
                    </ListItem>
                    <ListItem>
                        <Hyperlink
                            href="http://aboutads.info/choices/"
                            breakText
                        >
                            http://aboutads.info/choices/
                        </Hyperlink>
                    </ListItem>
                    <ListItem>
                        <Hyperlink
                            href="http://youronlinechoices.eu"
                            breakText
                        >
                            http://youronlinechoices.eu
                        </Hyperlink>
                    </ListItem>
                    <ListItem>
                        <Hyperlink
                            href="http://networkadvertising.org/choices/"
                            breakText
                        >
                            http://networkadvertising.org/choices/
                        </Hyperlink>
                    </ListItem>
                    <ListItem>
                        <Hyperlink
                            href="http://aboutads.info/"
                            breakText
                        >
                            http://aboutads.info/
                        </Hyperlink>
                    </ListItem>
                    <ListItem>
                        <Hyperlink
                            href="https://rhythmone.com/opt-out"
                            breakText
                        >
                            https://rhythmone.com/opt-out
                        </Hyperlink>
                    </ListItem>
                    <ListItem>
                        <Hyperlink
                            href="https://google.com/policies/privacy/partners/"
                            breakText
                        >
                            https://google.com/policies/privacy/partners/
                        </Hyperlink>
                    </ListItem>
                </List>
            </Section>
            <Footing>
                Mis à jour le 24 mars 2022
            </Footing>
        </Card >
    </>
);
