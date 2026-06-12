import type { Metadata } from 'next';
import Link from 'next/link';
import { generalWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description:
    'Conoce la historia y misión de GreenPath: llevar la biodiversidad del Caribe colombiano a los hogares colombianos con acompañamiento real.',
};

export default function SobreNosotrosPage() {
  const waUrl = generalWhatsAppUrl();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="text-green-700 font-bold uppercase tracking-widest text-xs">
          Nuestra historia
        </span>
        <h1 className="text-4xl font-serif text-stone-900 mt-2 mb-4">
          Somos GreenPath
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Nacimos del amor por las plantas tropicales del Caribe colombiano y de la
          convicción de que cualquier hogar puede convertirse en un jardín vivo con el
          acompañamiento correcto.
        </p>
      </div>

      {/* Story */}
      <section className="mb-12 bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
        <h2 className="text-2xl font-serif text-stone-800 mb-4">¿Cómo empezamos?</h2>
        <div className="text-stone-600 leading-relaxed space-y-4">
          <p>
            Todo comenzó con una palma de vino en un balcón de Barranquilla. Queríamos
            llevar un pedacito del Caribe a los hogares de Colombia, pero nos dimos
            cuenta de que la mayoría de las personas no sabía cómo cuidar plantas
            tropicales nativas.
          </p>
          <p>
            Reunimos un equipo de botánicos, paisajistas y amantes de la naturaleza para
            crear algo diferente: no solo vender plantas, sino enseñar a las personas a
            cultivar una relación duradera con ellas. Así nació GreenPath.
          </p>
          <p>
            Hoy trabajamos directamente con viveros de la costa Caribe, ofrecemos cursos
            en línea y acompañamos a cada cliente desde la primera compra hasta que su
            planta florece.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif text-stone-800 mb-6 text-center">
          Lo que nos mueve
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: '🌍',
              title: 'Biodiversidad local',
              desc: 'Promovemos especies nativas del Caribe colombiano que se adaptan al clima de la región.',
            },
            {
              icon: '🤝',
              title: 'Acompañamiento real',
              desc: 'No te dejamos solo. Desde el primer riego hasta la primera flor, estamos contigo por WhatsApp.',
            },
            {
              icon: '📚',
              title: 'Educación verde',
              desc: 'Creemos que una persona que entiende sus plantas las cuida mejor. Por eso creamos cursos prácticos.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-stone-800 mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-12 bg-green-50 rounded-3xl p-8 border border-green-100">
        <h2 className="text-2xl font-serif text-stone-800 mb-6">Nuestro equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: 'Pedro Eli Diaz Olarte', role: 'Freelancer', emoji: '💻' },
            { name: 'Juan Francisco Cantillo Perez', role: 'Freelancer', emoji: '💻' },
            { name: 'Pedro Luis Carrascal Betin', role: 'Freelancer', emoji: '💻' },
          ].map((member) => (
            <div key={member.name} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
              <div className="text-4xl leading-none flex-shrink-0">{member.emoji}</div>
              <div>
                <p className="font-bold text-stone-800 text-sm">{member.name}</p>
                <p className="text-stone-400 text-xs">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center bg-stone-900 text-white rounded-3xl p-10">
        <h2 className="text-2xl font-serif mb-3 text-green-400">
          ¿Listos para empezar tu jardín?
        </h2>
        <p className="opacity-80 mb-6 max-w-md mx-auto">
          Explora nuestro catálogo o escríbenos y te ayudamos a elegir la planta perfecta
          para tu espacio.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/catalogo"
            className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
          >
            Ver catálogo
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold transition-colors"
          >
            💬 Escribirnos
          </a>
        </div>
      </div>
    </div>
  );
}
