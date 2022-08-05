import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer>
      <hr className="gray-hr" />
      <section class="section py-4">
        <div class="container">
          <div class="columns mb-0">
            <div>
              <a class="is-block mb-4 title is-size-4 has-text-dark" href="#">
                <p class="title is-size-6 has-text-grey-darker" style={{opacity: '0.8'}}>
                © 2022 Stint. All rights reserved.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
