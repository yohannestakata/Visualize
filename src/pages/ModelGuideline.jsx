import Heading from "../components/Heading";

function ModelGuideline() {
  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="col-span-5 col-start-3 flex flex-col gap-6 leading-7">
        <section>
          <Heading as="h1">
            Uploading 3D Models for Student Learning: A Guide for Teachers
          </Heading>
          <p className="mt-4">
            This guide provides you with everything you need to know about
            uploading 3D models to Visualize for student learning. These models
            will be interactive, allowing students to explore and gain deeper
            understanding of various subjects.
          </p>
        </section>
        <section>
          <Heading as="h2">Finding 3D Models</Heading>
          <p className="mt-4">
            There are two main ways to acquire 3D models for upload:
          </p>
          <ol className="mt-4 flex list-decimal flex-col gap-2">
            <li>
              <b className="font-semibold">Creating your own models:</b> This
              allows for complete customization and aligns perfectly with your
              curriculum. We recommend using{" "}
              <a
                href="https://www.blender.org/"
                className="font-semibold text-primary"
              >
                Blender
              </a>
              , a free and powerful 3D creation software with a large online
              community for support.
            </li>
            <li>
              <b className="font-semibold">Finding existing models:</b> Several
              online repositories offer free 3D models. Here are some reputable
              sources with a focus on education:
              <ul className="mt-1  list-disc">
                <li>
                  <a
                    href="https://sketchfab.com/"
                    className="font-semibold text-primary"
                  >
                    Sketchfab:
                  </a>
                  &nbsp; A vast library of user-uploaded models across various
                  disciplines
                </li>
                <li>
                  {" "}
                  <a
                    href="https://www.thingiverse.com/search?type=things"
                    className="font-semibold text-primary"
                  >
                    Thingiverse:
                  </a>{" "}
                  Primarily focused on 3D printable models, but also offers
                  educational resources
                </li>{" "}
                <li>
                  {" "}
                  <a
                    href="https://thenounproject.com/browse/icons/term/free/"
                    className="font-semibold text-primary"
                  >
                    The Noun Project:
                  </a>{" "}
                  Offers free icons and symbols that can be useful for simpler
                  models
                </li>
              </ul>
            </li>
          </ol>
          <p className="mt-4">
            <b className="font-semibold">Important Note:</b> When using existing
            models, ensure they have a free license for commercial use
            (attribution may be required). Always check the license details
            before uploading.
          </p>
        </section>
        <section>
          <Heading as="h2">3D Model Requirements</Heading>
          <p className="mt-4">
            For optimal performance and interactivity on our platform, all
            uploaded models must adhere to the following guidelines:
          </p>
          <ul className="mt-4  list-disc">
            <li>
              File format: Models must be exported in the glTF 2.0 format (.glb
              or .gltf files).
            </li>
            <li>
              Poly count: Aim for a balance between detail and performance.
              Complex models with extremely high poly counts might not load
              smoothly.
            </li>
            <li>
              Textures: Textures should be optimized for web delivery. Use
              compressed formats like JPG or PNG and keep texture sizes
              reasonable.
            </li>
            <li>
              Materials: Use simple materials with basic colors and lighting.
              Avoid complex shaders or particle effects as they can cause
              rendering issues.
            </li>
            <li>
              Naming: Use clear and descriptive names for your models, meshes,
              and materials. This will help students understand the model&apos;s
              components.
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <Heading as="h2">Interactive Features</Heading>
          <p>
            Our platform allows students to interact with the models in two
            ways:
          </p>
          <ol className=" list-decimal">
            <li>
              Orbit Controls: Students can rotate and zoom in/out on the model
              for a 360-degree view.
            </li>
            <li>
              Click-to-Define: Individual meshes (parts) of your model can be
              linked to definitions or pop-up information boxes. This allows you
              to provide students with additional details when they click on
              specific parts of the model.
            </li>
          </ol>
          <p>
            How to Set Up Click-to-Define: (Specific instructions may vary
            depending on your chosen 3D creation software. Here&apos;s a general
            guideline for Blender users)
          </p>
          <ol className=" list-decimal">
            <li>In Blender, select the desired mesh within your model.</li>
            <li>
              Go to the Object Data Properties panel and find the &quot;Custom
              Properties&quot; section.
            </li>
            <li>Create a new property with a descriptive name </li>
            <li>
              Enter the text that you want to display when the mesh is clicked
              on this property field.
            </li>
            <li>
              Repeat steps 1-4 for each mesh you want to add definitions to.
            </li>
          </ol>
        </section>
        <section className="flex flex-col gap-4">
          <Heading as="h2">Additional Tips</Heading>
          <ul className=" list-disc">
            <li>
              Consider using color-coding to differentiate different parts of
              the model and enhance visual learning.
            </li>
            <li>
              Keep models visually clean and uncluttered for better student
              focus.
            </li>
            <li>
              Provide a short description or title for your model that
              summarizes its learning objective.
            </li>
            <li>
              Test your model on the platform before uploading to ensure
              everything functions as intended.
            </li>
          </ul>
          <p>
            By following these guidelines, you can create high-quality,
            interactive 3D models that will significantly enrich your
            students&apos; learning experience on visualzie.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ModelGuideline;
