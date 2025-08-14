import { Link } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../../hooks/useAuth";
import { justLanding, repoUrl } from "../../config";

export default function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative bg-white flex items-center justify-center">
      <div className="container mx-auto mt-52 mb-48 px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="px-3 py-1 rounded-xs text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200 select-none">
              Join the future of research
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to <span className="text-blue-600">transform</span> your
            research?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience the power of AI-driven research with Escruta. Organize
            your sources, take smart notes, and discover insights faster than
            ever before.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to={justLanding ? repoUrl : "/app"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white hover:bg-blue-700 group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xs border border-blue-600 px-6 md:px-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white select-none w-full md:w-auto"
            >
              {isAuthenticated() ? "Go to app" : "Get started"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
