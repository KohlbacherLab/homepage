<script setup>
import { VPImage } from 'vitepress/theme';
const image = {
    light: '/images/software/OpenMS_transparent_blackFont.svg',
    dark: '/images/software/OpenMS_transparent_whiteFont.svg'
}
</script>

<VPImage :image="image" width="30%" />

[OpenMS](https://www.openms.de) is a powerful open-source software platform for analyzing mass spectrometry (MS) data. 
Actively developed for over two decades, it enables reproducible workflows across diverse applications such as:

- Bottom-up and top-down proteomics  
- Metabolomics  
- Structural biology  
- Oligonucleotide MS  

With a rich library of algorithms and tools, OpenMS supports both experimental researchers and developers.  

- **Ready-to-use workflows** (e.g. [OpenMS WebApps](https://openms.readthedocs.io/en/latest/getting-started/webapps.html)) simplify data analysis.  
- **Customizable modules** in C++ and Python ([pyOpenMS](https://pyopenms.readthedocs.io/en/latest/)) enable tailored solutions and seamless 
integration with machine learning, visualization, and statistical pipelines.

---

## Deployment Options

OpenMS can be deployed in many ways:

- **Interactive use** - graphical user interface and command-line tools  
- **Custom scripting** - Python ([pyOpenMS](https://pyopenms.readthedocs.io/en/latest/)) for rapid prototyping and integration with data science libraries  
- **Workflow systems** - integration with [Nextflow](https://www.nextflow.io/), [Snakemake](https://snakemake.readthedocs.io/), and [KNIME](https://www.knime.com/)  
- **Scalable environments** - optimized for desktop use, HPC clusters, and cloud deployments  

---

## Key Features

OpenMS is:

- **Open and interoperable** - using HUPO-PSI open-standard file formats for maximum compatibility  
- **Accessible** - with modern documentation and Python support  
- **Scalable** - from single-PC use to cloud-based pipelines  
- **Community-driven** - built by 150+ contributors worldwide, openly available on [GitHub](https://github.com/OpenMS/OpenMS) under a permissive BSD license  

---

In short, [OpenMS](https://www.openms.de) empowers researchers to perform cutting-edge, reproducible MS data analysis - from individual experiments to large-scale, automated pipelines.
