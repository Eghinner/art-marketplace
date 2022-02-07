import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MainNav, Footer } from "../components";
import { getProductoByIdAsync } from "../actions/productosActions";
import { isAuthenticated } from "../utils/isAuthenticated";
import { PUBLIC_URL } from "../config/constants";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [download, setDownload] = useState(false);
  const { id } = useParams();
  const token = isAuthenticated();
  const history = useHistory();
  const redirect = () => {
    let path = `/login`;
    history.push(path);
  };

  useEffect(() => {
    // Since we're only fetching the product and doing nothing else after that,
    // There's no need to await for the promise to resolve
    getProductoByIdAsync(id, setProduct);
  }, [id]);

  return (
    <>
      <MainNav />
      <section className="max-w-screen-2xl mx-auto px-20 pt-16">
        <div className="container items-center">
          <div className="w-full 2xl:pl-11">
            <p className="text-black text-xl sm:text-2xl font-normal">
              Inicio / Catálogo / {product?.categories.name || "Categoría"} /{" "}
              {product?.name || "Producto"}
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-screen-2xl mx-auto px-11 pt-9">
        <div className="w-full container items-center">
          <div className="flex flex-col xl:flex-row justify-between w-full">
            <div className="xl:w-1/2 h-full mt-10 px-2 sm:px-4 xl:my-0 md:px-8 lg:px-20 xl:px-5 2xl:pl-11 order-last xl:order-first">
              <div className="flex px-5 flex-col w-full pb-6 space-y-8 2xl:pr-20">
                <h1 className="text-center xl:text-left text-3xl md:text-4xl font-bold tracking-add text-black leading-add">
                  <span className="block">{product?.name || "Producto"}</span>
                </h1>
                <div className="pl-1 py-2 pr-9">
                  <p className="mx-auto text-base text-black mb-2 lg:text-lg">
                    {product?.description || "Description"}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <button
                    onClick={token ? () => setDownload(true) : () => redirect()}
                    className="py-3.5 hover-scale text-xl font-semibold leading-6 text-white whitespace-nowrap add-color-icon rounded-md tracking-add shadow-button"
                  >
                    Descargar
                  </button>
                </div>
                {download && (
                  <ul className="p-1">
                    {product?.files.map((f, i) => (
                      <li key={i} className="mb-2">
                        <a href={`${PUBLIC_URL}${f.path}`} download>
                          <div className="flex hover-scale--min justify-between border bg-white shadow-slider px-6 py-2 rounded-lg">
                            {f.name}
                            <span>
                              <img
                                className="h-6"
                                alt="download icon"
                                src="https://img.icons8.com/material-outlined/50/000000/download--v1.png"
                              />
                            </span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex xl:w-1/2 h-full items-center justify-center xl:justify-start px-2 sm:px-0 xl:pr-5 2xl:pr-0">
              <div className="flex w-full h-full overflow-hidden rounded-md sm:rounded-xl justify-center">
                {
                  product && (<img
                    alt="Producto"
                    style={{ maxHeight: "450px" }}
                    src={`${PUBLIC_URL}${product?.images[0]?.path}`}
                    className="block object-contain h-96 md:h-full"
                  />)
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto lg:px-11 xl:px-0 2xl:px-11 pb-20 lg:pb-40 2xl:pb-60 ">
        <div className="flex flex-col w-full px-2 sm:px-8 xl:px-5 2xl:px-11">
          <div className="relative flex flex-col w-full mt-16 lg:flex-row">
            <div className="relative lg:w-1/2 space-y-3 lg:space-y-5 2xl:pr-20">
              <details className="relative px-6 py-2 overflow-hidden text-black bg-add rounded-lg select-none">
                <summary className="cursor-pointer">
                  <h4 className="inline-flex items-center justify-between py-4 text-xl font-medium text-black cursor-pointer lg:text-2xl">
                    <span>Información General</span>
                  </h4>
                </summary>
                <p className="px-1 pt-0 mt-1 text-black font-semibold lg:text-xl py-7">
                  {product?.technical_specifications}
                </p>
              </details>
              <details className="relative px-6 py-2 overflow-hidden text-black bg-add rounded-lg select-none">
                <summary className="cursor-pointer">
                  <h4 className="inline-flex items-center justify-between py-4 text-xl font-medium text-black cursor-pointer lg:text-2xl">
                    Links
                  </h4>
                </summary>
                <p className="px-1 pt-0 mt-1 text-black font-semibold lg:text-xl py-7">
                  {product?.links}
                </p>
              </details>

              <details className="relative px-6 py-2 overflow-hidden text-black bg-add rounded-lg select-none">
                <summary className="cursor-pointer">
                  <h4 className="inline-flex items-center justify-between py-4 text-xl font-medium text-black cursor-pointer lg:text-2xl">
                    <span>Información relacionada</span>
                  </h4>
                </summary>
                <p className="px-1 pt-0 mt-1 text-black font-semibold lg:text-xl py-7">
                  {product?.related_information}
                </p>
              </details>

              <details className="relative px-6 py-2 overflow-hidden text-black bg-add rounded-lg select-none">
                <summary className="cursor-pointer">
                  <h4 className="inline-flex items-center justify-between py-4 text-xl font-medium text-black cursor-pointer lg:text-2xl">
                    <span>Clasificación</span>
                  </h4>
                </summary>
                <p className="px-1 pt-0 mt-1 text-black font-semibold lg:text-xl py-7">
                  {product?.classification}
                </p>
              </details>

              <details className="relative px-6 py-2 overflow-hidden text-black bg-add rounded-lg select-none">
                <summary className="cursor-pointer">
                  <h4 className="inline-flex items-center justify-between py-4 text-xl font-medium text-black cursor-pointer lg:text-2xl">
                    <span>Propiedades</span>
                  </h4>
                </summary>
                <p className="px-1 pt-0 mt-1 text-black font-semibold lg:text-xl py-7">
                  {product?.properties}
                </p>
              </details>
            </div>
            <div className="hidden lg:block relative flex flex-col w-/12 mt-16 lg:flex-row"></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Product;
