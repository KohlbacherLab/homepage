# FLAME – A Privacy-Preserving Federated Learning Platform

As part of the German national research initiative [PrivateAIM](https://kohlbacherlab.org/projects/privateaim.html), the open-source platform FLAME
(**F**ederated **L**earning and **A**nalyses in **Me**dicine) is under development to address key challenges in privacy-preserving, collaborative data analysis
in healthcare. Rather than transferring sensitive patient data between institutions, FLAME distributes analysis algorithms across participating sites,
ensuring that data remains securely within each institution's Data Integration Center (DIC) - fully compliant with data protection and security standards.

FLAME builds on and improves upon two existing federated learning frameworks, PADME and PHT-meDIC, by combining their best features into a unified,
modular system. Its hub-and-node architecture enables nodes to act either as data providers or aggregators. Aggregators never access raw data but
merge encrypted, locally trained models or results. This setup allows distributed learning without compromising data privacy, enabling efficient
coordination and encrypted communication via the central hub.

A key advantage of FLAME over related work lies in its generic and flexible analysis framework, which allows researchers to execute various analysis
workflows - ranging from classical statistics to modern machine learning and genomic pipelines - without redesigning the infrastructure for
each use case. This flexibility is achieved using secure container images that bundle all necessary software dependencies and integrate
standardized interfaces, reusable pipelines, and robust privacy-enhancing technologies (PETs). By contrast, many existing systems are limited
to specific algorithms or fixed workflows, making them less adaptable to real-world medical research's diverse and evolving needs.

Privacy and security are essential to FLAME's design. PETs are embedded throughout the analysis lifecycle — from data provisioning to result
submission and distribution. A multi-layered security model ensures that only authorized participants can access outputs, and all communication
and computation steps are protected using state-of-the-art encryption and privacy mechanisms.

FLAME is currently undergoing testing, with the initial infrastructure deployed at pilot institutions. The project is actively evaluating scalability,
interoperability, and resilience to privacy attacks, making FLAME a practical solution for medical AI and a significant step forward
in developing secure and trustworthy federated learning environments.

Fore more information visit our [documentation](https://docs.privateaim.net/) or [project info page](https://privateaim.de/).
