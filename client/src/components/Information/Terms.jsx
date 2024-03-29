import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import s from './Information.module.css';

export default function Terms() {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
    const nameCompany = 'HenryTravel';
    const url = 'proyecto-final-henry.vercel.app';
    return (
        <div className={s.information_container}>
            <div className={s.information_content}>
                <h2 className={s.information_title}>Terminos y Condiciones</h2>
                <p className={s.information_text}>
                Los términos y condiciones aquí establecidos son aplicables al uso del sitio web y/o las propiedades móviles de <b>{nameCompany}</b>, que incluyen las aplicaciones relacionadas (conjuntamente, este “Sitio Web”). Los términos “nosotros”, “nos”, “nuestro” y “{url}” hacen referencia a <b>{nameCompany}</b>, una sociedad constituida en la República Argentina. El término “usted” hace referencia al cliente que visita el Sitio Web o que contribuye con contenido en este Sitio Web de cualquier modo.
                <br /><br />
                Se le ofrece este Sitio Web siempre que acepte, sin modificaciones, todos los términos, las condiciones y los avisos establecidos a continuación (conjuntamente, el “Acuerdo”). Al acceder o usar este Sitio Web de alguna manera, conviene en estar vinculado por el presente Acuerdo y declara haber leído y comprendido todos sus términos. Lea el Acuerdo atentamente, ya que contiene información relacionada con sus derechos, así como también una sección relacionada con las leyes aplicables y la jurisdicción en caso de disputas. Si no acepta todos los términos y condiciones, no deberá utilizar ni informarse a través de este Sitio Web.
                <br /><br />
                Es posible que cambiemos o modifiquemos de otro modo el Acuerdo en un futuro, y usted comprende y conviene que, si continúa accediendo o usando este Sitio Web después de dicho cambio, esto significa que acepta el Acuerdo actualizado o modificado. Indicaremos la fecha en que se realizaron las revisiones de este Acuerdo por última vez en la parte superior de esta página, y todas las revisiones entrarán en vigor al publicarse. Notificaremos a nuestros miembros sobre cambios sustanciales en los presentes términos y condiciones al enviar un aviso a la dirección de correo electrónico proporcionada al momento del registro o al publicar un aviso en nuestro Sitio Web. Asegúrese de consultar esta página periódicamente para revisar la versión más reciente de este Acuerdo.
                </p>
                <h2 className={s.information_caption}>USO DEL SITIO WEB</h2>
                <p className={s.information_text}>
                    Como condición de uso de este Sitio Web, usted garantiza que (i) toda la información que proporciona en este Sitio Web es verdadera, precisa y completa, (ii) si tiene una cuenta de <b>{nameCompany}</b>, protegerá su información de la cuenta, y supervisará y se hará completamente responsable de cualquier uso de la cuenta que haga otra persona que no sea usted y (iii) que es mayor de edad para las leyes de la República Argentina, para así registrarse en una cuenta y realizar contribuciones en nuestro Sitio Web. <b>{nameCompany}</b> no recaba a sabiendas la información de ninguna persona menor de 18 años. Conservamos el derecho, a nuestro exclusivo criterio, de denegar el acceso a cualquier persona a este Sitio Web y a los servicios que ofrecemos, en cualquier momento y por cualquier motivo, lo que incluye, entre otros, la infracción de este Acuerdo.
                </p>
                <h2 className={s.information_caption}>ACTIVIDADES PROHIBIDAS</h2>
                <p className={s.information_text}>
                El contenido y la información en este Sitio Web (lo que incluye, entre otros, los mensajes, los datos, la información, el texto, la música, los sonidos, las fotografías, los gráficos, los videos, los mapas, los íconos, el software, el código y otros materiales), así como la infraestructura utilizada para brindar dicho contenido e información, es de nuestra propiedad. Usted conviene en no modificar, copiar, distribuir, transmitir, mostrar, realizar, reproducir, publicar, licenciar, crear trabajos derivados de, transferir, vender o revender cualquier información, software, productos o servicios obtenidos de este Sitio Web o a través de este Sitio Web. Además, usted acuerda no realizar las siguientes acciones:
                <br /><br />
                1. acceder, monitorear o copiar cualquier contenido o información de este Sitio Web mediante cualquier medio robótico, spider, scraper  u otro medio automático o cualquier proceso manual por ningún motivo sin el permiso expreso por escrito;
                2. violar las restricciones en cualquier encabezado de exclusión robótico en este Sitio Web o evitar o eludir cualquier medida utilizada para evitar o limitar el acceso a este Sitio Web;
                3. tratar de modificar, traducir, adaptar, editar, descompilar, deshacer o revertir la ingeniería de cualquier programa de software utilizado por <b>{nameCompany}</b> en relación con el Sitio Web o los servicios;
                4. crear contenidos no relacionados con el elemento sobre el que se está opinando, intencionadamente falsos, inmorales, pornográficos u ofensivos, que infrinjan los derechos de terceros y, más concretamente, los derechos de autor; contrarios a la ley vigente o constitutivos de delito, y de cualquier otro tipo que no se relacione con el objetivo de {url}.
                </p>
                <h2 className={s.information_caption}>POLÍTICAS DE PRIVACIDAD Y DIVULGACIÓN</h2>
                <p className={s.information_text}>
                Haga clic <Link to='/privacy'>aqui</Link> para consultar nuestras <Link to='/privacy'>Políticas de privacidad</Link> actuales, que también regulan el uso de <b>{nameCompany}</b>, a fin de comprender nuestras prácticas y el alcance de la protección.

                En algunas circunstancias, podemos divulgar información sobre usted a terceros si determinamos, a nuestro exclusivo criterio, que dicha divulgación es necesaria (a) para proteger los sistemas, los recursos, los empleados, los miembros y los clientes de <b>{nameCompany}</b>; (b) para garantizar la integridad y el funcionamiento de los negocios y sistemas de {url}; o (c) para cumplir con las solicitudes, las notificaciones o las órdenes judiciales gubernamentales legítimas y exigibles. Es posible que optemos por cumplir o descartar dichas solicitudes u órdenes a nuestro exclusivo criterio. El derecho de <b>{nameCompany}</b> a divulgar información, lo que incluye, entre otros, la información de perfil de usuario (es decir, el nombre, la dirección de correo electrónico, etc.), la dirección IP y la información de tráfico, las valoraciones y comentarios, el historial de uso y el Contenido publicado, tendrá prioridad sobre cualquiera de los términos de las <Link to='/privacy'>Políticas de privacidad</Link> de <b>{nameCompany}</b>
                </p>
                <h2 className={s.information_caption}>OPINIONES, VALORACIONES Y COMENTARIO</h2>
                <p className={s.information_text}>
                Usted comprende que al enviar contenido a este Sitio Web por cualquier medio, publicaciones en este Sitio Web u otros medios, incluidas las opiniones, las valoraciones, las preguntas, los comentarios, las sugerencias, las ideas o contenido similar en cualquiera de los envíos (conjuntamente, los “Envíos”), otorga a <b>{nameCompany}</b> y a sus afiliadas el derecho no exclusivo, sin regalías, perpetuo, transferible, irrevocable y susceptible de ser sublicenciado por completo de (a) usar, reproducir, modificar, adaptar, traducir, distribuir, publicar, crear trabajos derivados de y mostrar públicamente y realizar dichos Envíos por el mundo por cualquier medio, ahora conocido o desarrollado luego de la fecha de los presentes, por cualquier motivo; y (b) usar el nombre que envía en relación con dicho Envío. Usted reconoce que <b>{nameCompany}</b> puede optar por atribuirle a usted o no sus comentarios u opiniones a su criterio. Además, usted otorga a <b>{nameCompany}</b> el derecho de demandar judicialmente a cualquier persona o entidad que infrinja sus derechos y/o los de <b>{nameCompany}</b> Usted reconoce y conviene que los Envíos no son confidenciales ni sujetos a derechos de propiedad.
                <br /><br />
                Usted reconoce especialmente que la actividad en este Sitio Web puede implicar que otros usuarios realicen una valoración sobre usted, que podrá incluir una puntuación de satisfacción y comentarios. Todo ello podrá ser escrito y publicado en el Sitio Web, formar parte de su perfil público y generar un ranking en el que podrá ser posicionado. Eventualmente, también podrá serle requerido a usted que proporcione una valoración de su experiencia y/o respecto de otros usuarios que podrá ser publicada, así como sus observaciones y opiniones, que deberán ser proporcionadas de buena fe.
                <br /><br />
                {url} se reserva el derecho a utilizar, compartir y mostrarle a usted, al público en general y a los demás usuarios/as, las valoraciones y observaciones relacionadas de cualquier modo a la actividad desplegada por usted como usuario del Sitio Web. Usted reconoce y acepta que ni <b>{nameCompany}</b> ni los administradores de los Sitios Web tienen la obligación de verificar las valoraciones y observaciones de los publicadores y se reservan el derecho a editar o borrar comentarios en caso de que dichos comentarios sean obscenos y/u objetables de otro modo, incluyan el nombre de un particular u otra información personal o violen cualquier ley de privacidad, otras leyes aplicables o políticas de contenidos aplicables.
                <br /><br />
                Este Sitio Web puede contener además foros de consultas y discusión, tableros de anuncios, servicios de revisión u otros foros en los que usted o terceros pueden publicar fotografías, videos, opiniones sobre experiencias de viajes, experiencia de compra, u otro contenido, mensajes, materiales u otros elementos en este Sitio Web (“Áreas interactivas”). Si <b>{nameCompany}</b> brinda dichas Áreas Interactivas, usted es el único responsable del uso que haga de dichas Áreas Interactivas y las utilizará a su propio riesgo. Al utilizar cualquiera de las Áreas Interactivas, conviene expresamente en no publicar, cargar, transmitir, distribuir, almacenar, crear o publicar de otro modo a través de este Sitio Web lo siguiente:
                <br /><br />
                1. Mensajes, datos, información, texto, música, sonidos, fotos, gráficos, códigos u otros materiales (“Contenido”) que sea ilegal, injurioso, difamatorio, obsceno, pornográfico, indecente, lascivo, alusivo, con hostigamiento, amenazante, invasivo de la privacidad o de los derechos de publicidad, abusivo, difamatorio, fraudulento o de algún modo impugnable;
                2. Contenido que pueda infringir, derechos de autor u otro derecho intelectual o de propiedad de cualquier tercero;
                3. Contenido que suplante a cualquier persona o entidad o que de otro modo represente erróneamente su afiliación con una persona o entidad, incluido <b>{nameCompany}</b>;
                4. Promociones, campañas políticas, anuncios, concursos, rifas o peticiones no solicitados ni autorizados;
                5. Información privada de cualquier tercero, lo que incluye, sin límites, el apellido, direcciones, número de teléfono, direcciones de correo electrónico, números de cualquier documento de identidad y números de tarjeta de crédito;
                6. Virus, datos de computadora u otros archivos perjudiciales, disgregantes o destructivos;
                7. Contenido que no se relacione con el tema de las Áreas Interactivas en las que se publica el Contenido; o
                8. Contenido o vínculos a contenido que, según el exclusivo criterio de <b>{nameCompany}</b>, (a) viole los puntos anteriores del presente, (b) sea impugnable, (c) restrinja o evite que cualquier otra persona use o goce las Áreas Interactivas o este Sitio Web, o (d) que pueda exponer a <b>{nameCompany}</b> o sus afiliadas o sus usuarios a cualquier daño o responsabilidad de cualquier tipo.
                <br /><br />
                <b>{nameCompany}</b> no se responsabiliza ni asume ninguna responsabilidad por cualquier contenido publicado, almacenado o cargado por usted o un tercero, o por cualquier pérdida o daño a este, ni se hace responsable por errores, difamación, calumnias, exposiciones, omisiones, falsedades, obscenidades, pornografía o profanidades que usted pueda encontrar. Como proveedor de servicios interactivos, <b>{nameCompany}</b> no se responsabiliza por manifestaciones, declaraciones o Contenido provisto por sus usuarios en cualquier foro público, perfil personal u otra Área Interactiva. Aunque <b>{nameCompany}</b> no tenga la obligación de evaluar, editar o monitorear cualquier Contenido publicado o distribuido mediante cualquier Área Interactiva, <b>{nameCompany}</b> se reserva el derecho, a su absoluta discreción, de eliminar, evaluar, traducir o editar sin aviso cualquier Contenido publicado o almacenado en este Sitio Web en cualquier momento y por cualquier motivo, o hacer que dichas acciones sean realizadas por terceros en su nombre, y usted es el único responsable de crear copias de seguridad y reemplazar cualquier Contenido que publique o almacene en este Sitio Web a su exclusivo costo y cargo. Usted asume no incorporar difamaciones contra la empresa.
                <br /><br />
                Si se determina que usted conserva los derechos morales (incluidos los derechos de atribución o integridad) sobre el Contenido, por el presente declara que (a) no requiere que se use información de identificación personal en relación con el Contenido, o con cualquier trabajo derivado de este o sus actualizaciones o mejoras; (b) no objeta la publicación, el uso, la modificación, la eliminación y la explotación del Contenido por <b>{nameCompany}</b> o sus licenciatarios, sucesores y designados; (c) exime por siempre y conviene en no reclamar ni exigir derecho a cualquiera de los derechos morales de un autor sobre cualquiera de los Contenidos; y (d) exime por siempre a <b>{nameCompany}</b> y sus licenciatarios, sucesores y cesionarios, de cualquier reclamo al que tendría derecho de otro modo contra <b>{nameCompany}</b> en virtud de dichos derechos morales.
                <br /><br />
                Cualquier uso de las Áreas Interactivas u otras partes de este Sitio Web en infracción de lo anteriormente dicho infringe los términos de este Acuerdo y puede provocar, entre otras cosas, la rescisión o suspensión de sus derechos a usar las Áreas Interactivas o este Sitio Web.
                </p>
                <h2 className={s.information_caption}>INDEMNIZACIÓN</h2>
                <p className={s.information_text}>
                Usted acepta defender e indemnizar a <b>{nameCompany}</b> y sus afiliadas y a cualquiera de sus funcionarios, directores, empleados y agentes por cualquier reclamo, causa de acción, demanda, contingencia, pérdida, daño, multa, sanción u otros costos o gastos de cualquier tipo o naturaleza, incluidos, sin limitarse a, los honorarios razonables por servicios legales y de contabilidad ofrecidos por terceros como consecuencia de su:
                <br /><br />
                1. incumplimiento del presente Acuerdo o los documentos a los que se hace referencia en el presente;
                2. violación de cualquier ley o derecho de un tercero; o
                3. mal uso de este Sitio Web.
                4. Incorporación de difamaciones en contra de esta compañía.
                </p>
                <h2 className={s.information_caption}>JURISDICCIÓN Y LEY APLICABLE</h2>
                <p className={s.information_text}>
                    Estos términos y condiciones se rigen por las leyes de la República Argentina. Por el presente, usted consiente en que todos los reclamos que pueda tener contra <b>{nameCompany}</b> que surjan o se relacionen con las disposiciones aquí contenidas están sujetos a la jurisdicción exclusiva de los tribunales competentes ubicados en la Ciudad Autónoma de Buenos Aires, República Argentina.
                </p>
            </div>
            
            <Footer />
        </div>
    )
}