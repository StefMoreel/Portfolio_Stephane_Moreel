function Links({ link, ariaLabel, icon }) {
  return (
    <>
      <div>
        <a
          href={link}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon}
        </a>
      </div>
    </>
  );
}

export default Links;
